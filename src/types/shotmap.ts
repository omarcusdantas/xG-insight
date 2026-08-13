export type ShotType = "goal" | "save" | "miss" | "block" | "post";

interface Player {
  name: string;
  id: number;
  shortName?: string;
}

export interface Shot {
  id: number;
  time: number;
  isHome: boolean;
  shotType: ShotType;
  xg: number;
  xgot: number;
  player: Player;
}

export interface ShotmapResponse {
  shotmap: Shot[];
}

export type Team = "home" | "away";
