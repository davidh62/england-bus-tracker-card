/** Route ladder as a platform departure sign (spec: hiap-008).
 *
 *  Modelled on a rail platform sign rather than the over-door strip:
 *  the user is waiting to board, not riding, so the view runs UP TO
 *  their stop, not onward to the terminus.
 *
 *    Line 1  — headline: next bus to <destination> at HH:MM (N min)
 *    Line 2  — ladder: the approaching bus crawling toward YOUR stop
 *    Line 3  — followed by: the next one in the same direction
 *
 *  Direction is chosen from the route's real destinations (aliased
 *  `towards` values). A cycle button appears only when there's more
 *  than one — a true reverse for two, a cycle for short workings,
 *  nothing for circular/single-direction routes. The chosen direction
 *  persists per browser (real card, localStorage is fine).
 *
 *  Departures come merged (live over timetable) from the next-bus
 *  sensor's `departures` attribute, so the sign shows times even when
 *  nothing is tracking; the ladder strip only draws when the headline
 *  bus is live (we have its journey).
 */

import { html, css, nothing, svg, TemplateResult } from "lit";
import type {
  Departure,
  Discovered,
  JourneyStop,
  LadderOptions,
  VehicleInfo,
} from "./types";

const VIEW_W = 640;
const VIEW_H = 150;
const BASE_Y = 96;
const X_MIN = 40;
const X_MAX = 524;
const MAX_VISIBLE = 8;

export const ladderStyles = css`
  .sign {
    padding: 6px 10px 10px;
  }
  .sign-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }
  .sign-title {
    font-weight: 700;
    font-size: 15px;
  }
  .sign-sub {
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .sign-when {
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .sign-dot {
    color: var(--ebt-live, #2e7d32);
    margin-right: 3px;
  }
  .sign-late {
    color: var(--ebt-late, #c62828);
  }
  .dir-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    border: 1px solid var(--divider-color, #999);
    border-radius: 14px;
    padding: 2px 10px;
    font-size: 12px;
    background: transparent;
    color: var(--primary-text-color);
    user-select: none;
  }
  .dir-btn:hover {
    background: var(--secondary-background-color);
  }
  .ladder svg {
    display: block;
    width: 100%;
    height: auto;
    margin: 2px 0;
  }
  .sign-followed {
    font-size: 13px;
    color: var(--secondary-text-color);
    padding-top: 2px;
  }
  .ladder-hint {
    padding: 12px;
    color: var(--secondary-text-color);
    text-align: center;
    font-size: 13px;
  }
`;

function fmt(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "--:--";
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

/** Comma split (NaPTAN style) first; else wrap at last space past ~15. */
function splitName(raw: string): string[] {
  const clip = (s: string) => (s.length > 16 ? s.slice(0, 15) + "…" : s);
  const name = raw.trim();
  const ci = name.indexOf(",");
  if (ci > 0)
    return [clip(name.slice(0, ci).trim()), clip(name.slice(ci + 1).trim())];
  if (name.length <= 15) return [name];
  let cut = name.lastIndexOf(" ", 15);
  if (cut <= 0) cut = name.indexOf(" ");
  if (cut <= 0) return [clip(name)];
  return [clip(name.slice(0, cut)), clip(name.slice(cut + 1).trim())];
}

function windowIndices(count: number, userIdx: number): number[] {
  const last = count - 1;
  const pinned = new Set<number>([0, Math.min(1, last), last]);
  if (userIdx > 0) pinned.add(userIdx);
  const free = MAX_VISIBLE - pinned.size;
  const pool: number[] = [];
  for (let i = 1; i < last; i++) if (!pinned.has(i)) pool.push(i);
  if (free > 0 && pool.length > 0) {
    const step = pool.length / Math.min(free, pool.length);
    for (let k = 0; k < Math.min(free, pool.length); k++)
      pinned.add(pool[Math.floor(k * step)]);
  }
  return [...pinned].sort((a, b) => a - b);
}

/** A departure tagged with the stop it calls at (for the ladder anchor). */
interface StopDeparture extends Departure {
  atco: string;
  stopName: string;
}

/** The approaching bus's stops from its current position up to (and
 *  including) the user's stop — the journey truncated at the boarding
 *  point, since nothing past it matters to someone waiting to board. */
function approachStops(v: VehicleInfo, atco: string): JourneyStop[] | null {
  const js = v.journey?.stops;
  if (!js) return null;
  const idx = js.findIndex((s) => s.a === atco);
  if (idx < 1) return null; // not ahead of the bus (or already there)
  return js.slice(0, idx + 1);
}

function renderStrip(
  raw: JourneyStop[],
  progress: number,
  picture: string | null
): TemplateResult {
  // Collapse consecutive stops that share a name (e.g. a "Drake Road"
  // adj/opp pair) — showing the same name twice reads as a glitch.
  const stops: JourneyStop[] = [];
  for (const s of raw)
    if (!stops.length || stops[stops.length - 1].n !== s.n) stops.push(s);

  // Window, then also collapse any same-name stops that ended up
  // ADJACENT on screen after sampling (e.g. two "Drake Road" stops with
  // a third, elided stop between them in the real sequence).
  const win = windowIndices(stops.length, stops.length - 1);
  const lastIdx = win[win.length - 1];
  const visible: number[] = [];
  for (const idx of win) {
    const prev = visible.length ? stops[visible[visible.length - 1]].n : null;
    if (stops[idx].n !== prev) visible.push(idx);
    else if (idx === lastIdx) visible[visible.length - 1] = idx; // keep endpoint
  }
  const n = visible.length;
  const xFor = (k: number) =>
    n === 1 ? (X_MIN + X_MAX) / 2 : X_MIN + (k * (X_MAX - X_MIN)) / (n - 1);
  const parts: unknown[] = [];

  for (let k = 0; k < n - 1; k++) {
    const gap = visible[k + 1] - visible[k] > 1 || stops[visible[k + 1]].gap;
    parts.push(svg`<line
      x1=${xFor(k)} y1=${BASE_Y} x2=${xFor(k + 1)} y2=${BASE_Y}
      stroke="var(--secondary-text-color)" stroke-width="3"
      stroke-dasharray=${gap ? "7 6" : nothing}
    />`);
  }

  visible.forEach((idx, k) => {
    const s = stops[idx];
    const x = xFor(k);
    const isStop = k === n - 1; // the user's stop = right endpoint
    const accent = "var(--primary-color)";
    const col = isStop ? accent : "var(--primary-text-color)";
    const lines = splitName(s.n);
    parts.push(svg`<circle
      cx=${x} cy=${BASE_Y} r=${isStop ? 7 : 5}
      fill=${isStop ? accent : "var(--card-background-color)"}
      stroke=${isStop ? accent : "var(--primary-text-color)"} stroke-width="2.5"
    />`);
    parts.push(svg`<g transform="translate(${x - 2}, ${BASE_Y - 18}) rotate(-45)">
      ${lines.map(
        (line, li) =>
          svg`<text x="0" y=${li * 13} font-size="12.5"
            font-weight=${isStop ? "700" : "400"} fill=${col}
            font-family="inherit">${line}</text>`
      )}
    </g>`);
    parts.push(svg`<text x=${x} y=${BASE_Y + 26} text-anchor="middle"
      font-size="11.5" fill=${isStop ? accent : "var(--secondary-text-color)"}
      font-weight=${isStop ? "700" : "400"} font-family="inherit">${fmt(
      s.t
    )}</text>`);
  });

  if (n >= 2 && picture) {
    const bx = xFor(0) + Math.min(1, Math.max(0, progress)) * (xFor(1) - xFor(0));
    // Ride ON the line (a bus on its route). The name is lifted and the
    // time dropped a few px to give the badge breathing room here.
    parts.push(svg`<image href=${picture} x=${bx - 20} y=${BASE_Y - 20}
      width="40" height="40" />`);
  }

  return html`<div class="ladder">
    <svg viewBox="0 0 ${VIEW_W} ${VIEW_H}" preserveAspectRatio="xMidYMid meet">
      ${parts}
    </svg>
  </div>`;
}

export function renderLadder(
  d: Discovered,
  routes: string[],
  stops: string[],
  opts: LadderOptions,
  chosenDest: string | null,
  onCycleDest: (dest: string) => void
): TemplateResult {
  // Which route this sign is for
  const withDeps = d.nextBus.filter(
    (nb) =>
      nb.departures.length &&
      (stops.length === 0 || stops.includes(nb.atco)) &&
      (routes.length === 0 || routes.includes(nb.route))
  );
  const route = opts.route || withDeps[0]?.route;
  if (!route)
    return html`<div class="ladder-hint">
      No departures to show yet — pick a route with tracked stops.
    </div>`;

  // All this route's departures across the card's stops, tagged by stop
  const all: StopDeparture[] = [];
  for (const nb of withDeps) {
    if (nb.route !== route) continue;
    for (const dep of nb.departures)
      all.push({ ...dep, atco: nb.atco, stopName: nb.stopName });
  }
  if (!all.length)
    return html`<div class="ladder-hint">
      No upcoming ${route} departures right now.
    </div>`;

  // Destinations offered (distinct, in soonest-first order)
  const dests: string[] = [];
  for (const dep of all.slice().sort((a, b) => a.when.localeCompare(b.when)))
    if (dep.towards && !dests.includes(dep.towards)) dests.push(dep.towards);

  const dest =
    chosenDest && dests.includes(chosenDest)
      ? chosenDest
      : opts.towards && dests.includes(opts.towards)
        ? opts.towards
        : dests[0];

  // This direction's departures, soonest first, deduped
  const seen = new Set<string>();
  const sign = all
    .filter((dep) => dep.towards === dest)
    .sort((a, b) => a.when.localeCompare(b.when))
    .filter((dep) => {
      const k = `${dep.when}|${dep.vehicleRef ?? ""}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

  const head = sign[0];
  const followed = sign[1];

  // Direction cycle button (only when there's a choice)
  const dirButton =
    dests.length > 1
      ? html`<button
          class="dir-btn"
          @click=${() => onCycleDest(dests[(dests.indexOf(dest) + 1) % dests.length])}
          title="Change direction"
        >
          <ha-icon icon="mdi:swap-horizontal"></ha-icon>${dest}
        </button>`
      : nothing;

  if (!head)
    return html`<div class="sign">
      <div class="sign-head">
        <span class="sign-title">${route} to ${dest}</span>${dirButton}
      </div>
      <div class="ladder-hint">No upcoming departures in this direction.</div>
    </div>`;

  // The approach strip, only when the headline bus is live and found
  let strip: TemplateResult | typeof nothing = nothing;
  if (head.live && head.vehicleRef) {
    const veh = d.vehicles.find(
      (v) => v.vehicleRef === head.vehicleRef && v.route === route
    );
    const appr = veh ? approachStops(veh, head.atco) : null;
    if (veh && appr && appr.length >= 2)
      strip = renderStrip(appr, veh.journey?.progress ?? 0, veh.picture);
  }

  const headSub = html`${head.live
    ? html`<span class="sign-dot">●</span>`
    : nothing}${head.minutesUntil <= 0
    ? "Due"
    : `${head.minutesUntil} min`}${head.live && head.delayMinutes > 0
    ? html` · <span class="sign-late">${head.delayMinutes} min late</span>`
    : head.live
      ? " · on time"
      : ""}`;

  return html`<div class="sign">
    <div class="sign-head">
      <span class="sign-title">Next ${route} to ${dest}</span>${dirButton}
    </div>
    <div class="sign-head">
      <span class="sign-sub">${headSub}</span>
      <span class="sign-when">${fmt(head.when)}</span>
    </div>
    ${strip}
    ${followed && opts.show_caption !== false
      ? (() => {
          // Relabel an overnight/next-day "followed by" — a 513-minute gap
          // to the first bus tomorrow reads as absurd as "Followed by".
          const fd = new Date(followed.when);
          const now = new Date();
          const dayDiff = Math.round(
            (new Date(fd.getFullYear(), fd.getMonth(), fd.getDate()).getTime() -
              new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) /
              86400000
          );
          const lead =
            dayDiff === 1
              ? "First bus tomorrow"
              : dayDiff > 1
                ? `First bus ${fd.toLocaleDateString("en-GB", { weekday: "long" })}`
                : "Followed by";
          const sameDay = dayDiff <= 0;
          return html`<div class="sign-followed">
            ${lead} <span class="sign-when">${fmt(followed.when)}</span>${followed.live &&
            sameDay
              ? html` <span class="sign-dot">●</span>`
              : nothing}${sameDay && followed.minutesUntil > 0
              ? ` (${followed.minutesUntil} min)`
              : ""}
          </div>`;
        })()
      : nothing}
  </div>`;
}
