/** Config schema for the England Bus Tracker card. */

export interface BoardOptions {
  colourway?: "classic" | "light" | "theme";
  font_preset?: "dot-matrix" | "clean";
  bg?: string;
  text_color?: string;
  accent_color?: string;
  show_anomaly?: boolean;
}

export interface MapOptions {
  zoom?: number;
  height?: number; // map-card card_size units (1 ≈ 50px), 4-12
  theme_mode?: "auto" | "light" | "dark";
  marker_size?: number;
  stop_size?: number; // stand-marker icon size (px); default 30
  show_route_line?: boolean; // draw cached road-following route shapes
  line_colour?: string; // override the route line colour (blank = auto)
}

export interface LadderOptions {
  route?: string; // specific route; omitted/"" = auto (soonest to your stop)
  towards?: string; // pin a direction by (aliased) destination, e.g. "Parkgate"
  show_caption?: boolean;
}

export type SectionName = "map" | "board" | "ladder";

export interface EBTCardConfig {
  type: string;
  title?: string;
  show_title?: boolean;
  device_id?: string;
  routes?: string[]; // empty/omitted = all routes on the device
  stops?: string[]; // atco codes; empty/omitted = all stops on the device
  order?: SectionName[]; // render order of enabled sections
  show_board?: boolean;
  show_map?: boolean;
  show_ladder?: boolean;
  board?: BoardOptions;
  map?: MapOptions;
  ladder?: LadderOptions;
}

/** One upcoming departure (live overlaid on timetable), from the sensor. */
export interface Departure {
  when: string; // ISO
  live: boolean;
  delayMinutes: number;
  towards: string;
  minutesUntil: number;
  vehicleRef: string | null;
}

/** A discovered next-bus sensor with its useful attributes. */
export interface NextBusInfo {
  entityId: string;
  route: string;
  towards: string;
  atco: string;
  stopName: string;
  live: boolean;
  minutesUntil: number | null;
  delayMinutes: number;
  when: Date | null;
  departures: Departure[];
}

export interface StopInfo {
  entityId: string;
  name: string;
  atco: string;
  lat: number | null;
  lon: number | null;
}

/** One stop on a vehicle's remaining journey (integration v0.7.3+). */
export interface JourneyStop {
  a: string; // atco
  n: string; // display name
  t: string; // ETA, ISO local time
  gap?: boolean; // stops elided before this one (dashed segment)
}

export interface JourneyData {
  stops: JourneyStop[]; // last-passed stop → terminus
  progress: number; // 0..1 within the first segment
  terminus: string;
  towards?: string;
}

export interface VehicleInfo {
  entityId: string;
  route: string;
  towards: string;
  vehicleRef: string | null; // links a departure to this bus's journey
  picture: string | null; // the SVG badge data-URI
  journey: JourneyData | null;
}

/** A route's road-following line, discovered from a vehicles sensor. */
export interface RouteShape {
  entityId: string; // the sensor carrying the route_geojson attribute
  colour: string;
}

export interface Discovered {
  nextBus: NextBusInfo[];
  stops: StopInfo[];
  vehicles: VehicleInfo[];
  anomalies: { entityId: string; route: string; on: boolean }[];
  routes: string[]; // distinct, sorted
  /** route -> distinct towards labels (aliased), for editor labels */
  routeLabels: Record<string, string[]>;
  /** route -> its line geometry source (only routes with a real shape) */
  routeShapes: Record<string, RouteShape>;
  /** this monitor's HA device name (name_by_user||name), for map scoping */
  deviceName: string;
}
