import { EnglandBusTrackerCard } from "./card";
import { EnglandBusTrackerCardEditor } from "./editor";

const VERSION = "0.4.8";

customElements.define("england-bus-tracker-card", EnglandBusTrackerCard);
customElements.define(
  "england-bus-tracker-card-editor",
  EnglandBusTrackerCardEditor
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "england-bus-tracker-card",
  name: "England Bus Tracker Card",
  description:
    "Live bus departure board and map for the England Bus Tracker integration — zero-YAML visual editor.",
  preview: true,
  documentation_url: "https://github.com/davidh62/england-bus-tracker-card",
});

console.info(
  `%c ENGLAND BUS TRACKER CARD %c v${VERSION} `,
  "background:#1565c0;color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#ffff00;color:#000;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px"
);
