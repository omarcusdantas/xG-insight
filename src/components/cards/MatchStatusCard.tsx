import { useTranslation } from "react-i18next";
import { Card } from "./Card";
import { useMatchContext } from "../../hooks/useMatchContext";

import type { MatchStatusType } from "../../types/event";

const STATUS_STYLES: Record<MatchStatusType, string> = {
  inprogress: "bg-green-soft text-green",
  finished: "bg-surface-2 text-text-dim",
  notstarted: "bg-cyan-soft text-cyan",
  postponed: "bg-red-soft text-red",
};

const STATUS_I18N: Record<MatchStatusType, string> = {
  inprogress: "status.live",
  finished: "status.finished",
  notstarted: "status.notStarted",
  postponed: "status.postponed",
};

function formatKickoff(timestamp: number): { date: string; time: string } {
  const d = new Date(timestamp * 1000);
  return {
    date: d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function MatchStatusCard() {
  const { t } = useTranslation();
  const { eventInfo } = useMatchContext();
  const {
    homeTeamName,
    awayTeamName,
    homeScore,
    awayScore,
    status,
    startTimestamp,
    tournamentName,
  } = eventInfo;

  const kickoff = formatKickoff(startTimestamp);

  return (
    <Card title={t("cards.matchStatus")} titleAccent="match">
      <div className="text-center text-xs text-text-dim">{tournamentName}</div>

      <div className="flex items-baseline justify-between gap-3">
        <span className="flex-1 text-right text-lg font-semibold text-cyan">{homeTeamName}</span>
        <span className="min-w-16 text-center text-2xl font-bold tabular-nums">
          {homeScore} – {awayScore}
        </span>
        <span className="flex-1 text-left text-lg font-semibold text-red">{awayTeamName}</span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[status]}`}
        >
          {t(STATUS_I18N[status])}
        </span>
      </div>

      <div className="text-center text-xs text-text-dim">
        {kickoff.date} · {kickoff.time}
      </div>
    </Card>
  );
}
