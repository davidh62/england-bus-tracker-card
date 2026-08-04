/** Map mode — generates the battle-tested auto-entities + ha-map-card
 *  config from the editor's settings and embeds it via card helpers.
 *  Reuses the proven stack rather than reinventing a map; requires
 *  nathan-gs/ha-map-card and thomasloven/auto-entities (HACS) for this
 *  mode only. Stops are included by their discovered entity_ids (built
 *  at runtime, so no cross-entry contamination and nothing hardcoded). */

import type { Discovered, MapOptions } from "./types";

// Default route-line colour. OSM tiles use yellows/oranges for roads,
// green for parks and blue for water — a strong purple collides with
// none of them, so the line stays legible on any tile set. Overridable
// per card via the "Route line colour" option. (Badge fills were tried
// as the source but light liveries like yellow vanish on the map.)
const DEFAULT_LINE_COLOUR = "#7b1fa2";

export function buildMapConfig(
  d: Discovered,
  routes: string[],
  stops: string[],
  opts: MapOptions
): any {
  const useStops =
    stops.length === 0 ? d.stops : d.stops.filter((s) => stops.includes(s.atco));
  const stopIds = useStops.map((s) => s.entityId);
  const lats = useStops.map((s) => s.lat).filter((v): v is number => v !== null);
  const lons = useStops.map((s) => s.lon).filter((v): v is number => v !== null);
  const x = lats.length ? lats.reduce((a, b) => a + b, 0) / lats.length : undefined;
  const y = lons.length ? lons.reduce((a, b) => a + b, 0) / lons.length : undefined;

  // Scope the (integration-wide) vehicle filter to THIS device's routes.
  // Falling back to "*" when "all routes" are selected would also match
  // vehicles from other config entries — e.g. the 487 gatecrashing a
  // 471/472 card. Use the device's discovered routes instead.
  const filterRoutes = routes.length ? routes : d.routes;
  const routeFilter =
    filterRoutes.length === 0
      ? "*"
      : filterRoutes.length === 1
        ? filterRoutes[0]
        : `/^(${filterRoutes
            .map((r) => r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
            .join("|")})$/`;

  const card: any = {
    type: "custom:map-card",
    card_size: Math.min(12, Math.max(4, opts.height ?? 8)),
    zoom: opts.zoom ?? 14,
    theme_mode: opts.theme_mode ?? "light",
    focus_follow: "none",
    // Leaflet TileLayers default to maxZoom 18; OSM tiles go to ~20, so
    // lift the cap to allow tight "ground radar" framing (19 is crisp,
    // 20 is upscaled/over-zoom).
    tile_layer_options: { maxZoom: 20 },
  };
  if (x !== undefined && y !== undefined) {
    card.x = x;
    card.y = y;
  }

  // Route lines — one geojson layer per selected route that has genuine
  // road-following geometry (real shapes only; nothing drawn otherwise).
  const useRoutes = routes.length === 0 ? Object.keys(d.routeShapes) : routes;
  const routeLines =
    opts.show_route_line === false
      ? []
      : useRoutes
          .map((r) => d.routeShapes[r])
          .filter((s): s is NonNullable<typeof s> => !!s)
          .map((s) => ({
            entity_id: s.entityId,
            options: {
              geojson: {
                attribute: "route_geojson",
                color: opts.line_colour || DEFAULT_LINE_COLOUR,
                weight: 4,
                opacity: 0.7,
                hide_marker: true,
              },
            },
          }));

  return {
    type: "custom:auto-entities",
    card,
    card_param: "entities",
    filter: {
      include: [
        ...routeLines,
        ...stopIds.map((entity_id) => ({
          entity_id,
          options: {
            display: "icon",
            icon: "mdi:bus-stop",
            color: "#d32f2f",
            size: opts.stop_size ?? 30,
            // Keep stop pins BELOW the vehicles so a bus is never hidden
            // by a stop. Leaflet otherwise stacks markers by latitude,
            // which makes the layering flip depending on positions.
            z_index_offset: 100,
          },
        })),
        {
          integration: "uk_bus_tracker",
          domain: "device_tracker",
          attributes: { route_badge: "*", route: routeFilter },
          options: {
            display: "marker",
            label: " ",
            size: opts.marker_size ?? 64,
            color: "transparent",
            css: "--card-background-color: transparent; --ha-marker-border-radius: 0;",
            // Always above the stop pins, wherever the bus is.
            z_index_offset: 1000,
          },
        },
      ],
      exclude: [{ state: "unavailable" }],
    },
  };
}
