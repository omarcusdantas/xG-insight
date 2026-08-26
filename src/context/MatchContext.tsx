import { type ReactNode, useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import type { Shot, Team } from "../types/shotmap";
import type { EventInfo } from "../types/event";
import { MatchContext } from "./matchContextInstance";
import type { MatchContextValue } from "./matchContextInstance";
import { type XgThreshold, formatXgThreshold, parseXgThreshold } from "../lib/filters";

const XG_THRESHOLD_PARAM = "xg";

type MatchProviderProps = {
  shots: Shot[];
  homeTeamName: string;
  awayTeamName: string;
  eventInfo: EventInfo;
  children: ReactNode;
};

export function MatchProvider({
  shots,
  homeTeamName,
  awayTeamName,
  eventInfo,
  children,
}: MatchProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const xgThreshold = parseXgThreshold(searchParams.get(XG_THRESHOLD_PARAM));

  const [team, setTeam] = useState<Team>("home");
  const [shotIndex, setShotIndex] = useState(0);

  const handleThresholdChange = useCallback(
    (value: XgThreshold) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === 0) {
            next.delete(XG_THRESHOLD_PARAM);
          } else {
            next.set(XG_THRESHOLD_PARAM, formatXgThreshold(value));
          }
          return next;
        },
        { replace: true }
      );
      setShotIndex(0);
    },
    [setSearchParams]
  );

  const handleTeamChange = useCallback((value: Team) => {
    setTeam(value);
    setShotIndex(0);
  }, []);

  const value = useMemo<MatchContextValue>(
    () => ({
      shots,
      homeTeamName,
      awayTeamName,
      eventInfo,
      xgThreshold,
      team,
      shotIndex,
      setXgThreshold: handleThresholdChange,
      setTeam: handleTeamChange,
      setShotIndex,
      nextShot: () => setShotIndex((i) => i + 1),
      prevShot: () => setShotIndex((i) => Math.max(0, i - 1)),
    }),
    [
      shots,
      homeTeamName,
      awayTeamName,
      eventInfo,
      xgThreshold,
      team,
      shotIndex,
      handleThresholdChange,
      handleTeamChange,
    ]
  );

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
}
