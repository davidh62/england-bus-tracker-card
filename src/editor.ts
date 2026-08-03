/** Visual editor v0.2.2 — David's user journey (2026-08-02):
 *  identity first (title → tracker → stops → routes), then display
 *  sections as toggles with accordions, reorderable with arrows.
 *
 *  Form-element strategy (hard-won):
 *  - v0.2.0 used ha-textfield/ha-select directly → they silently
 *    rendered as NOTHING (the entities-editor preload defines
 *    ha-selector but not ha-textfield; undefined custom elements
 *    render as absence, not errors).
 *  - v0.2.1 routed everything through ha-selector → text selectors
 *    got entangled with the device picker's combo-box overlay
 *    (device list popping up under colour fields).
 *  - v0.2.2: free-text inputs are PLAIN NATIVE <input> styled with
 *    HA CSS vars — zero dependencies, nothing can interfere.
 *    ha-selector remains only where it earns it: device picker,
 *    number sliders, select dropdowns. */

import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { discover } from "./discovery";
import type { EBTCardConfig, SectionName } from "./types";

const SECTION_LABELS: Record<SectionName, string> = {
  map: "Map display",
  board: "Announcement board",
  ladder: "Route ladder",
};
const DEFAULT_ORDER: SectionName[] = ["map", "board", "ladder"];

const COLOURWAY_OPTIONS = [
  { value: "classic", label: "Classic board (black / yellow / green)" },
  { value: "light", label: "Light" },
  { value: "theme", label: "Follow HA theme" },
];

const TILE_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

export class EnglandBusTrackerCardEditor extends LitElement {
  @property({ attribute: false }) public hass: any;
  @state() private _config?: EBTCardConfig;
  @state() private _helpersLoaded = false;

  static styles = css`
    .section {
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;
    }
    .row .left {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .checks {
      display: flex;
      flex-wrap: wrap;
      gap: 0 16px;
    }
    .check {
      display: flex;
      align-items: center;
    }
    .check span {
      margin-left: 2px;
    }
    .muted {
      color: var(--secondary-text-color);
    }
    .group-label {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: -6px;
    }
    ha-expansion-panel {
      margin: 0 0 8px;
    }
    .panel-body {
      padding: 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    ha-icon-button {
      --mdc-icon-button-size: 32px;
      --mdc-icon-size: 18px;
    }
    .field {
      display: flex;
      flex-direction: column;
    }
    .field label {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    .field input {
      background: var(--mdc-text-field-fill-color, rgba(127, 127, 127, 0.08));
      border: none;
      border-bottom: 1px solid var(--divider-color, #666);
      border-radius: 4px 4px 0 0;
      color: var(--primary-text-color);
      padding: 10px 12px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
    }
    .field input:focus {
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 9px;
    }
  `;

  public async connectedCallback(): Promise<void> {
    super.connectedCallback();
    // Force-load HA's form elements (ha-selector etc.) — custom editors
    // must do this themselves or they render inert
    if (!customElements.get("ha-selector")) {
      try {
        const helpers = await (window as any).loadCardHelpers();
        const stub = helpers.createCardElement({ type: "entities", entities: [] });
        stub.hass = this.hass;
        await (stub.constructor as any).getConfigElement?.();
      } catch (e) {
        console.warn("england-bus-tracker-card: helper preload", e);
      }
    }
    this._helpersLoaded = true;
  }

  public setConfig(config: EBTCardConfig): void {
    this._config = config;
  }

  private _update(patch: Partial<EBTCardConfig>): void {
    this._config = { ...this._config!, ...patch };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _updateSub(section: "board" | "map", key: string, value: any): void {
    this._update({
      [section]: { ...(this._config?.[section] ?? {}), [key]: value },
    } as any);
  }

  /** Plain native text input — zero HA form dependencies, so nothing
   *  (like a stray combo-box overlay) can interfere with it. */
  private _text(label: string, value: string, onChange: (v: string) => void) {
    return html`<div class="field">
      <label>${label}</label>
      <input
        type="text"
        autocomplete="off"
        .value=${value}
        @input=${(ev: any) => onChange(ev.target.value)}
      />
    </div>`;
  }

  /** One ha-selector row — the only HA form element guaranteed loaded. */
  private _sel(
    label: string,
    selector: any,
    value: any,
    onChange: (v: any) => void
  ) {
    return html`<ha-selector
      .hass=${this.hass}
      .label=${label}
      .selector=${selector}
      .value=${value}
      .required=${false}
      @value-changed=${(ev: CustomEvent) => onChange(ev.detail.value)}
    ></ha-selector>`;
  }

  private _toggleIn(
    key: "routes" | "stops",
    all: string[],
    value: string,
    checked: boolean
  ): void {
    let list = this._config?.[key]?.length ? [...this._config![key]!] : [...all];
    if (checked && !list.includes(value)) list.push(value);
    if (!checked) list = list.filter((v) => v !== value);
    this._update({ [key]: list.length === all.length ? [] : list } as any);
  }

  private _order(): SectionName[] {
    const o = this._config?.order ?? [];
    return [...o, ...DEFAULT_ORDER.filter((s) => !o.includes(s))];
  }

  private _move(name: SectionName, dir: -1 | 1): void {
    const order = this._order();
    const i = order.indexOf(name);
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    [order[i], order[j]] = [order[j], order[i]];
    this._update({ order });
  }

  private _sectionEnabled(name: SectionName): boolean {
    if (name === "map") return this._config?.show_map === true;
    if (name === "board") return this._config?.show_board !== false;
    return this._config?.show_ladder === true;
  }

  private _setSection(name: SectionName, on: boolean): void {
    if (name === "map") this._update({ show_map: on });
    else if (name === "board") this._update({ show_board: on });
    else this._update({ show_ladder: on });
  }

  protected render() {
    if (!this.hass || !this._config || !this._helpersLoaded) return nothing;
    const d = discover(this.hass, this._config.device_id);
    const selRoutes = this._config.routes?.length
      ? this._config.routes
      : d.routes;
    const allStops = d.stops.map((s) => s.atco);
    const selStops = this._config.stops?.length ? this._config.stops : allStops;
    const board = this._config.board ?? {};
    const map = this._config.map ?? {};
    const order = this._order();

    return html`
      <!-- Identity -->
      <div class="section">
        ${this._text(
          "Card title (blank = monitor name)",
          this._config.title ?? "",
          (v) => this._update({ title: v || undefined })
        )}
        <div class="row">
          <span>Show title</span>
          <ha-switch
            .checked=${this._config.show_title !== false}
            @change=${(ev: any) =>
              this._update({ show_title: ev.target.checked })}
          ></ha-switch>
        </div>
        ${this._sel(
          "Tracker",
          { device: { filter: { integration: "uk_bus_tracker" } } },
          this._config.device_id,
          (v) => this._update({ device_id: v || undefined })
        )}

        ${!this._config.device_id
          ? html`<div class="muted" style="font-size:13px">
              Pick your tracker above — stops and routes appear once it's
              chosen.
            </div>`
          : nothing}
        ${this._config.device_id && d.stops.length
          ? html`<div class="group-label">Stops to monitor</div>
              <div class="checks">
                ${d.stops.map(
                  (s) => html`<label class="check">
                    <ha-checkbox
                      .checked=${selStops.includes(s.atco)}
                      @change=${(ev: any) =>
                        this._toggleIn("stops", allStops, s.atco, ev.target.checked)}
                    ></ha-checkbox>
                    <span>${s.name}</span>
                  </label>`
                )}
              </div>`
          : nothing}
        ${this._config.device_id && d.routes.length
          ? html`<div class="group-label">Routes to monitor</div>
              <div class="checks">
                ${d.routes.map((route) => {
                  const labels = d.routeLabels[route]?.join(" / ") ?? "";
                  return html`<label class="check">
                    <ha-checkbox
                      .checked=${selRoutes.includes(route)}
                      @change=${(ev: any) =>
                        this._toggleIn("routes", d.routes, route, ev.target.checked)}
                    ></ha-checkbox>
                    <span>${route}${labels ? ` → ${labels}` : ""}</span>
                  </label>`;
                })}
              </div>`
          : nothing}
      </div>

      <!-- Sections, in display order, reorderable -->
      ${order.map((name, idx) => {
        const enabled = this._sectionEnabled(name);
        return html`
          <div class="row">
            <div class="left">
              <ha-icon-button
                .disabled=${idx === 0}
                @click=${() => this._move(name, -1)}
                ><ha-icon icon="mdi:chevron-up"></ha-icon
              ></ha-icon-button>
              <ha-icon-button
                .disabled=${idx === order.length - 1}
                @click=${() => this._move(name, 1)}
                ><ha-icon icon="mdi:chevron-down"></ha-icon
              ></ha-icon-button>
              <span>
                ${SECTION_LABELS[name]}${name === "map"
                  ? html` <span class="muted"
                      >(needs ha-map-card + auto-entities)</span
                    >`
                  : ""}
              </span>
            </div>
            <ha-switch
              .checked=${enabled}
              @change=${(ev: any) => this._setSection(name, ev.target.checked)}
            ></ha-switch>
          </div>
          ${name === "board" && enabled
            ? html`<ha-expansion-panel outlined header="Board options">
                <div class="panel-body">
                  ${this._sel(
                    "Colourway",
                    { select: { mode: "dropdown", options: COLOURWAY_OPTIONS } },
                    board.colourway ?? "classic",
                    (v) => this._updateSub("board", "colourway", v)
                  )}
                  ${this._text(
                    "Headline colour override (blank = colourway)",
                    board.accent_color ?? "",
                    (v) =>
                      this._updateSub("board", "accent_color", v || undefined)
                  )}
                  ${this._text(
                    "Text colour override (blank = colourway)",
                    board.text_color ?? "",
                    (v) => this._updateSub("board", "text_color", v || undefined)
                  )}
                  ${this._text(
                    "Background override (blank = colourway)",
                    board.bg ?? "",
                    (v) => this._updateSub("board", "bg", v || undefined)
                  )}
                </div>
              </ha-expansion-panel>`
            : nothing}
          ${name === "ladder" && enabled
            ? html`<ha-expansion-panel outlined header="Ladder options">
                <div class="panel-body">
                  ${this._sel(
                    "Bus to follow",
                    {
                      select: {
                        mode: "dropdown",
                        options: [
                          {
                            value: "auto",
                            label: "Auto — next bus to your stop",
                          },
                          ...d.routes.flatMap((r) => {
                            const dests = d.routeLabels[r] ?? [];
                            // With >1 destination, offer each direction so
                            // the ladder can be pinned (e.g. 487 → Parkgate)
                            if (dests.length > 1) {
                              return [
                                { value: r, label: `${r} — either direction` },
                                ...dests.map((t) => ({
                                  value: `${r}::${t}`,
                                  label: `${r} → ${t}`,
                                })),
                              ];
                            }
                            return [{ value: r, label: `Route ${r}` }];
                          }),
                        ],
                      },
                    },
                    this._config.ladder?.towards
                      ? `${this._config.ladder.route}::${this._config.ladder.towards}`
                      : this._config.ladder?.route || "auto",
                    (v) => {
                      const [route, towards] =
                        v === "auto" ? [undefined, undefined] : v.split("::");
                      this._update({
                        ladder: {
                          ...(this._config?.ladder ?? {}),
                          route: route || undefined,
                          towards: towards || undefined,
                        },
                      });
                    }
                  )}
                  <div class="row">
                    <span>Caption line</span>
                    <ha-switch
                      .checked=${this._config.ladder?.show_caption !== false}
                      @change=${(ev: any) =>
                        this._update({
                          ladder: {
                            ...(this._config?.ladder ?? {}),
                            show_caption: ev.target.checked,
                          },
                        })}
                    ></ha-switch>
                  </div>
                </div>
              </ha-expansion-panel>`
            : nothing}
          ${name === "map" && enabled
            ? html`<ha-expansion-panel outlined header="Map options">
                <div class="panel-body">
                  <div class="row">
                    <span
                      >Route line
                      <span class="muted">(where the operator publishes one)</span></span
                    >
                    <ha-switch
                      .checked=${map.show_route_line !== false}
                      @change=${(ev: any) =>
                        this._updateSub(
                          "map",
                          "show_route_line",
                          ev.target.checked
                        )}
                    ></ha-switch>
                  </div>
                  ${map.show_route_line !== false
                    ? this._text(
                        "Route line colour (blank = auto from badge)",
                        map.line_colour ?? "",
                        (v) =>
                          this._updateSub("map", "line_colour", v || undefined)
                      )
                    : nothing}
                  ${this._sel(
                    "Map height",
                    { number: { min: 4, max: 12, mode: "slider" } },
                    map.height ?? 8,
                    (v) => this._updateSub("map", "height", v ?? 8)
                  )}
                  ${this._sel(
                    "Zoom",
                    { number: { min: 8, max: 18, mode: "slider" } },
                    map.zoom ?? 14,
                    (v) => this._updateSub("map", "zoom", v ?? 14)
                  )}
                  ${this._sel(
                    "Tiles",
                    { select: { mode: "dropdown", options: TILE_OPTIONS } },
                    map.theme_mode ?? "light",
                    (v) => this._updateSub("map", "theme_mode", v)
                  )}
                  ${this._sel(
                    "Badge size (px)",
                    { number: { min: 32, max: 96, step: 4, mode: "slider" } },
                    map.marker_size ?? 64,
                    (v) => this._updateSub("map", "marker_size", v ?? 64)
                  )}
                </div>
              </ha-expansion-panel>`
            : nothing}
        `;
      })}
    `;
  }
}
