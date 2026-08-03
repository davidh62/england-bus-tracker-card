/** England Bus Tracker card — main element (v0.2). */

import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { discover } from "./discovery";
import { renderBoard, boardStyles } from "./board";
import { renderLadder, ladderStyles } from "./ladder";
import { buildMapConfig } from "./map";
import type { EBTCardConfig, SectionName } from "./types";

const DEFAULT_ORDER: SectionName[] = ["map", "board", "ladder"];

export class EnglandBusTrackerCard extends LitElement {
  @property({ attribute: false }) public hass: any;
  @state() private _config?: EBTCardConfig;
  @state() private _ladderDest: string | null = null;
  private _mapEl: any = null;
  private _mapKey = "";

  private _ladderKey(): string {
    const dev = this._config?.device_id ?? "";
    const route = this._config?.ladder?.route ?? "*";
    return `ebt-ladder-dir:${dev}:${route}`;
  }

  private _cycleLadderDest(dest: string): void {
    this._ladderDest = dest;
    try {
      window.localStorage.setItem(this._ladderKey(), dest);
    } catch {
      /* private mode / storage disabled — keep it in memory only */
    }
  }

  static styles = [
    boardStyles,
    ladderStyles,
    css`
      ha-card {
        overflow: hidden;
      }
      h1.card-header {
        padding: 12px 16px 0;
        margin: 0;
        font-size: var(--ha-card-header-font-size, 24px);
        color: var(--ha-card-header-color, var(--primary-text-color));
        font-weight: 400;
      }
      .section {
        margin: 8px;
      }
      .map-wrap {
        border-radius: var(--ha-card-border-radius, 12px);
        overflow: hidden;
      }
      .hint {
        padding: 12px;
        color: var(--secondary-text-color);
        text-align: center;
      }
    `,
  ];

  public setConfig(config: EBTCardConfig): void {
    this._config = { show_board: true, ...config };
    this._mapEl = null;
    this._mapKey = "";
    try {
      this._ladderDest = window.localStorage.getItem(this._ladderKey());
    } catch {
      this._ladderDest = null;
    }
  }

  public getCardSize(): number {
    let size = 1;
    if (this._config?.show_board) size += 3;
    if (this._config?.show_map) size += this._config?.map?.height ?? 8;
    if (this._config?.show_ladder) size += 3;
    return size;
  }

  static getStubConfig(): Partial<EBTCardConfig> {
    return { show_board: true, show_map: false, routes: [], stops: [] };
  }

  private _title(): string | undefined {
    if (this._config?.show_title === false) return undefined;
    if (this._config?.title) return this._config.title;
    const devId = this._config?.device_id;
    if (devId) {
      const dev = this.hass?.devices?.[devId];
      return dev?.name_by_user || dev?.name;
    }
    return undefined;
  }

  private async _ensureMap(d: ReturnType<typeof discover>): Promise<void> {
    if (!this._config?.show_map) return;
    const cfg = buildMapConfig(
      d,
      this._config.routes ?? [],
      this._config.stops ?? [],
      this._config.map ?? {}
    );
    const key = JSON.stringify(cfg);
    if (this._mapEl && key === this._mapKey) {
      this._mapEl.hass = this.hass;
      return;
    }
    this._mapKey = key;
    try {
      const helpers = await (window as any).loadCardHelpers();
      const el = helpers.createCardElement(cfg);
      el.hass = this.hass;
      this._mapEl = el;
      this.requestUpdate();
    } catch (err) {
      console.error("england-bus-tracker-card: map embed failed", err);
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const d = discover(this.hass, this._config.device_id);
    const routes = this._config.routes ?? [];
    const stops = this._config.stops ?? [];
    if (this._config.show_map) this._ensureMap(d);

    const order = [
      ...(this._config.order ?? []),
      ...DEFAULT_ORDER.filter((s) => !(this._config!.order ?? []).includes(s)),
    ];

    const sections = order.map((name) => {
      if (name === "map" && this._config!.show_map)
        return html`<div class="section map-wrap">
          ${this._mapEl ?? html`<div class="hint">Loading map…</div>`}
        </div>`;
      if (name === "board" && this._config!.show_board)
        return html`<div class="section">
          ${renderBoard(d, routes, stops, this._config!.board ?? {})}
        </div>`;
      if (name === "ladder" && this._config!.show_ladder)
        return html`<div class="section">
          ${renderLadder(
            d,
            routes,
            stops,
            this._config!.ladder ?? {},
            this._ladderDest,
            (dest) => this._cycleLadderDest(dest)
          )}
        </div>`;
      return nothing;
    });

    const title = this._title();
    const noDevice =
      !this._config.device_id && d.nextBus.length === 0 && d.stops.length === 0;

    return html`
      <ha-card>
        ${title ? html`<h1 class="card-header">${title}</h1>` : nothing}
        ${noDevice
          ? html`<div class="hint">
              Pick your England Bus Tracker in the card editor to get started.
            </div>`
          : nothing}
        ${sections}
      </ha-card>
    `;
  }

  protected updated(): void {
    if (this._mapEl) this._mapEl.hass = this.hass;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("england-bus-tracker-card-editor");
  }
}
