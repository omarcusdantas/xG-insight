import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { Shot, Team } from "../types/shotmap";
import { MatchContext } from "./matchContextInstance";
import type { MatchContextValue } from "./matchContextInstance";

type MatchProviderProps = {
  shots: Shot[];
  children: ReactNode;
};

export function MatchProvider({ shots, children }: MatchProviderProps) {
  const [xgThreshold, setXgThreshold] = useState(0);
  const [team, setTeam] = useState<Team>("home");
  const [shotIndex, setShotIndex] = useState(0);

  const handleThresholdChange = useCallback((value: number) => {
    setXgThreshold(value);
    setShotIndex(0);
  }, []);

  const handleTeamChange = useCallback((value: Team) => {
    setTeam(value);
    setShotIndex(0);
  }, []);

  const value = useMemo<MatchContextValue>(
    () => ({
      shots,
      xgThreshold,
      team,
      shotIndex,
      setXgThreshold: handleThresholdChange,
      setTeam: handleTeamChange,
      setShotIndex,
      nextShot: () => setShotIndex((i) => i + 1),
      prevShot: () => setShotIndex((i) => Math.max(0, i - 1)),
    }),
    [shots, xgThreshold, team, shotIndex, handleThresholdChange, handleTeamChange]
  );

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
}
