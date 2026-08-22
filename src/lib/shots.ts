import { roundXg } from "./format";
import type { Shot, Team } from "../types/shotmap";

export function filterShots(shots: Shot[], threshold: number, team: Team): Shot[] {
  return shots
    .filter((s) => roundXg(s.xg, 2) >= threshold)
    .filter((s) => (team === "home" ? s.isHome : !s.isHome))
    .sort((a, b) => a.time - b.time);
}

export function splitByTeam(shots: Shot[]): {
  homeShots: Shot[];
  awayShots: Shot[];
} {
  const homeShots: Shot[] = [];
  const awayShots: Shot[] = [];
  for (const s of shots) {
    if (s.isHome) homeShots.push(s);
    else awayShots.push(s);
  }
  return { homeShots, awayShots };
}
