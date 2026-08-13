import { createContext } from "react";
import type { Shot, Team } from "../types/shotmap";

export interface MatchContextValue {
  shots: Shot[];
  xgThreshold: number;
  team: Team;
  shotIndex: number;
  setXgThreshold: (value: number) => void;
  setTeam: (value: Team) => void;
  setShotIndex: (value: number) => void;
  nextShot: () => void;
  prevShot: () => void;
}

export const MatchContext = createContext<MatchContextValue | null>(null);
