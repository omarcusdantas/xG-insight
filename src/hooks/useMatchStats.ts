import { type MatchOutcome, type TeamSummary, matchOutcome, summarizeTeam } from "../lib/xg";
import { filterShots, splitByTeam } from "../lib/shots";
import { useMatchContext } from "./useMatchContext";
import { useMemo } from "react";

import type { Shot } from "../types/shotmap";

interface MatchStats {
  filteredShots: Shot[];
  homeShots: Shot[];
  awayShots: Shot[];
  homeSummary: TeamSummary;
  awaySummary: TeamSummary;
  matchOutcomeXg: MatchOutcome;
  matchOutcomeXgot: MatchOutcome;
}

export function useMatchStats(): MatchStats {
  const { shots, xgThreshold } = useMatchContext();

  return useMemo<MatchStats>(() => {
    const thresholded = shots.filter((s) => s.xg >= xgThreshold);
    const { homeShots, awayShots } = splitByTeam(thresholded);

    const homeSummary = summarizeTeam(homeShots);
    const awaySummary = summarizeTeam(awayShots);

    return {
      filteredShots: thresholded,
      homeShots,
      awayShots,
      homeSummary,
      awaySummary,
      matchOutcomeXg: matchOutcome(homeSummary.goalDist, awaySummary.goalDist),
      matchOutcomeXgot: matchOutcome(homeSummary.goalDistXgot, awaySummary.goalDistXgot),
    };
  }, [shots, xgThreshold]);
}

export function useTeamShots(): Shot[] {
  const { shots, xgThreshold, team } = useMatchContext();
  return useMemo(() => filterShots(shots, xgThreshold, team), [shots, xgThreshold, team]);
}
