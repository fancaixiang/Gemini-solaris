export interface PlanetData {
  name: string;
  nameCN: string; // Chinese Name
  color: string;
  size: number; // Relative size for visualization
  distance: number; // Relative distance from Sun
  speed: number; // Orbital speed multiplier
  description: string; // Brief static description
  ring?: {
    innerRadius: number;
    outerRadius: number;
    color: string;
  };
}

export interface PlanetInfoState {
  loading: boolean;
  content: string | null;
  error: string | null;
}

export interface SimulationState {
  speed: number;
  isPaused: boolean;
  showOrbits: boolean;
}