/** Attribute-based entity discovery — the card's founding principle.
 *
 * Nothing is referenced by entity_id in config. Given a device_id, we
 * walk the entity registry for that device and classify entities by the
 * attribute signatures the integration guarantees:
 *   - next-bus sensors: route + atco_code + stop_name
 *   - stop trackers:    atco_code, domain device_tracker (no route_badge)
 *   - anomaly sensors:  binary_sensor with consecutive_empty_polls
 * Vehicles are never needed here — the map config finds them by
 * route_badge at render time inside auto-entities.
 */

import type { Discovered, NextBusInfo, StopInfo } from "./types";

export function discover(hass: any, deviceId?: string): Discovered {
  const out: Discovered = {
    nextBus: [],
    stops: [],
    vehicles: [],
    anomalies: [],
    routes: [],
    routeLabels: {},
    routeShapes: {},
    deviceName: "",
  };
  if (!hass) return out;

  // This monitor's device display name — used to scope the map's vehicle
  // filter to THIS monitor only (auto-entities `device:` matches by name),
  // so a route tracked by several monitors isn't drawn multiple times.
  if (deviceId) {
    const dev = hass.devices?.[deviceId];
    out.deviceName = dev ? dev.name_by_user || dev.name || "" : "";
  }

  const entityIds = Object.keys(hass.states).filter((eid) => {
    if (!deviceId) return true;
    const reg = hass.entities?.[eid];
    return reg && reg.device_id === deviceId;
  });

  const routeSet = new Set<string>();

  for (const eid of entityIds) {
    const state = hass.states[eid];
    if (!state) continue;
    const a = state.attributes || {};
    const domain = eid.split(".")[0];

    // Route line geometry — lives on the per-route "vehicles" sensor,
    // present only when the feed has genuine road-following geometry
    if (a.route && a.route_geojson) {
      out.routeShapes[String(a.route)] = {
        entityId: eid,
        colour: a.route_colour ? String(a.route_colour) : "#1565c0",
      };
    }

    if (domain === "sensor" && a.route && a.atco_code && a.stop_name) {
      const when =
        state.state && state.state !== "unknown" && state.state !== "unavailable"
          ? new Date(state.state)
          : null;
      const info: NextBusInfo = {
        entityId: eid,
        route: String(a.route),
        towards: a.towards ?? "",
        atco: String(a.atco_code),
        stopName: String(a.stop_name),
        live: a.live === true,
        minutesUntil:
          a.minutes_until !== undefined ? Number(a.minutes_until) : null,
        delayMinutes: a.delay_minutes !== undefined ? Number(a.delay_minutes) : 0,
        when,
        departures: Array.isArray(a.departures)
          ? a.departures.map((x: any) => ({
              when: String(x.when),
              live: x.live === true,
              delayMinutes: Number(x.delay_minutes ?? 0),
              towards: String(x.towards ?? ""),
              minutesUntil: Number(x.minutes_until ?? 0),
              vehicleRef: x.vehicle_ref != null ? String(x.vehicle_ref) : null,
            }))
          : [],
      };
      out.nextBus.push(info);
      routeSet.add(info.route);
      if (info.towards) {
        const labels = (out.routeLabels[info.route] ||= []);
        if (!labels.includes(info.towards)) labels.push(info.towards);
      }
    } else if (domain === "device_tracker" && a.route_badge) {
      // Live vehicle — needed for the ladder (journey attr, v0.7.3+)
      if (state.state !== "unavailable") {
        out.vehicles.push({
          entityId: eid,
          route: String(a.route ?? ""),
          towards: String(a.direction_label ?? a.destination ?? ""),
          vehicleRef: a.vehicle_ref != null ? String(a.vehicle_ref) : null,
          picture: a.entity_picture ? String(a.entity_picture) : null,
          journey: a.journey ?? null,
        });
      }
    } else if (domain === "device_tracker" && a.atco_code && !a.route_badge) {
      let name = String(a.friendly_name || eid);
      const devId = hass.entities?.[eid]?.device_id;
      const devName = devId ? hass.devices?.[devId]?.name_by_user || hass.devices?.[devId]?.name : "";
      if (devName && name.startsWith(devName)) name = name.slice(devName.length).trim();
      out.stops.push({
        entityId: eid,
        name: name || String(a.atco_code),
        atco: String(a.atco_code),
        lat: a.latitude !== undefined ? Number(a.latitude) : null,
        lon: a.longitude !== undefined ? Number(a.longitude) : null,
      } as StopInfo);
    } else if (
      domain === "binary_sensor" &&
      a.consecutive_empty_polls !== undefined &&
      a.route !== undefined
    ) {
      out.anomalies.push({
        entityId: eid,
        route: String(a.route),
        on: state.state === "on",
      });
    } else if (
      domain === "binary_sensor" &&
      a.consecutive_empty_polls !== undefined
    ) {
      // Older builds lack the route attribute — derive from the name
      const m = (a.friendly_name || eid).match(/(\S+)\s+service anomaly/);
      out.anomalies.push({
        entityId: eid,
        route: m ? m[1] : "?",
        on: state.state === "on",
      });
    }
  }

  out.nextBus.sort(
    (x, y) => x.route.localeCompare(y.route) || x.atco.localeCompare(y.atco)
  );
  out.routes = [...routeSet].sort();
  return out;
}

/** Devices provided by the uk_bus_tracker integration, for the editor. */
export function trackerDevices(hass: any): { id: string; name: string }[] {
  const result: { id: string; name: string }[] = [];
  if (!hass?.devices || !hass?.entities) return result;
  const deviceIds = new Set<string>();
  for (const eid of Object.keys(hass.entities)) {
    const reg = hass.entities[eid];
    if (!reg?.device_id) continue;
    const state = hass.states[eid];
    // Signature: any entity carrying our atco_code or route_badge attrs
    const a = state?.attributes || {};
    if (a.atco_code || a.route_badge || a.consecutive_empty_polls !== undefined) {
      deviceIds.add(reg.device_id);
    }
  }
  for (const id of deviceIds) {
    const dev = hass.devices[id];
    if (dev && dev.manufacturer === "Department for Transport (BODS)") {
      result.push({ id, name: dev.name_by_user || dev.name || id });
    }
  }
  result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}
