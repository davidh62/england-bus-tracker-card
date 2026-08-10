/** Native announcement-board renderer — the DOM version of the proven
 *  markdown recipe: dynamic towards, live dot, Due, delays, anomaly
 *  banner. Kills the card_mod + markdown + font setup entirely. */

import { html, css, nothing, TemplateResult } from "lit";
import type { BoardOptions, Discovered, NextBusInfo } from "./types";

export const boardStyles = css`
  .board {
    border-radius: var(--ha-card-border-radius, 12px);
    padding: 14px 10px;
    text-align: center;
    line-height: 1.7;
  }
  .board.dot-matrix {
    font-family: "Doto", "VT323", "Courier New", monospace;
    letter-spacing: 0.5px;
  }
  .board .headline {
    font-weight: 700;
  }
  .board .headline:not(:first-child) {
    margin-top: 10px;
  }
  .board .banner {
    font-weight: 700;
    color: var(--ebt-banner, #ffa000);
    margin-bottom: 6px;
  }
  .board .dot {
    display: inline-block;
    margin-right: 4px;
  }
`;

function fmtTime(d: Date | null): string {
  if (!d || isNaN(d.getTime())) return "--:--";
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function detail(s: NextBusInfo): string {
  const delay = s.delayMinutes > 0 ? `${s.delayMinutes} min late` : "on time";
  const until =
    s.minutesUntil !== null && s.minutesUntil <= 0
      ? "Due"
      : s.minutesUntil !== null
        ? `arriving in ${s.minutesUntil} min`
        : "";
  return until ? `${delay} · ${until}` : delay;
}

const COLOURWAYS: Record<string, { bg: string; text: string; accent: string; font: string }> = {
  classic: { bg: "#000000", text: "#ffff00", accent: "#33ff33", font: "dot-matrix" },
  light: { bg: "#f5f5f5", text: "#222222", accent: "#1565c0", font: "dot-matrix" },
  theme: {
    bg: "var(--card-background-color)",
    text: "var(--primary-text-color)",
    accent: "var(--primary-color)",
    font: "clean",
  },
};

export function renderBoard(
  d: Discovered,
  routes: string[],
  stops: string[],
  opts: BoardOptions
): TemplateResult {
  const way = COLOURWAYS[opts.colourway ?? "classic"] ?? COLOURWAYS.classic;
  const preset = opts.font_preset ?? way.font;
  const bg = opts.bg ?? way.bg;
  const text = opts.text_color ?? way.text;
  const accent = opts.accent_color ?? way.accent;

  const sensors = d.nextBus.filter(
    (s) =>
      (routes.length === 0 || routes.includes(s.route)) &&
      (stops.length === 0 || stops.includes(s.atco))
  );
  const anomalies = d.anomalies.filter(
    (a) => a.on && (routes.length === 0 || routes.includes(a.route))
  );

  return html`
    <div
      class="board ${preset}"
      style="background:${bg};color:${text}"
    >
      ${anomalies.map(
        (a) =>
          html`<div class="banner">
            ⚠ ${a.route}: live tracking unavailable — times below are timetabled
          </div>`
      )}
      ${sensors.length === 0
        ? html`<div>No arrival sensors found — check the tracker selection.</div>`
        : nothing}
      ${sensors.map(
        (s) => html`
          <div class="headline" style="color:${accent}">
            Next ${s.route}${s.towards ? ` to ${s.towards}` : ""} —
            ${fmtTime(s.when)}
          </div>
          <div>
            ${s.live ? html`<span class="dot">●</span>` : nothing}${detail(s)}
          </div>
        `
      )}
    </div>
  `;
}
