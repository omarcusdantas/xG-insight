import { Card } from "./Card";
import { pct } from "../../lib/format";
import { useTranslation } from "react-i18next";
import { useMatchContext } from "../../hooks/useMatchContext";

import type { MatchOutcome, TeamSummary } from "../../lib/xg";

type MatchOutcomeCardProps = {
  outcome: MatchOutcome;
  outcomeXgot: MatchOutcome;
  homeSummary: TeamSummary;
  awaySummary: TeamSummary;
};

export function MatchOutcomeCard({
  outcome,
  outcomeXgot,
  homeSummary,
  awaySummary,
}: MatchOutcomeCardProps) {
  const { t } = useTranslation();
  const { homeTeamName, awayTeamName } = useMatchContext();

  return (
    <Card title={t("cards.matchOutcome")} titleAccent="match">
      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-cyan">
            {homeTeamName}
          </div>
          <div className="flex items-baseline justify-between border-b border-border/50 py-1 text-sm">
            <span className="text-xs text-text-dim">{t("stats.expectedGoals") + " (xG)"}</span>
            <span className="text-lg font-bold tabular-nums text-cyan">
              {homeSummary.totalXg.toFixed(2)}
            </span>
          </div>
          <div className="flex items-baseline justify-between py-1 text-sm">
            <span className="text-xs text-text-dim">{t("stats.xGOnTarget") + " (xGOT)"}</span>
            <span className="text-lg font-bold tabular-nums text-green">
              {homeSummary.totalXgot.toFixed(2)}
            </span>
          </div>
        </div>
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-red">
            {awayTeamName}
          </div>
          <div className="flex items-baseline justify-between border-b border-border/50 py-1 text-sm">
            <span className="text-xs text-text-dim">{t("stats.expectedGoals") + " (xG)"}</span>
            <span className="text-lg font-bold tabular-nums text-cyan">
              {awaySummary.totalXg.toFixed(2)}
            </span>
          </div>
          <div className="flex items-baseline justify-between py-1 text-sm">
            <span className="text-xs text-text-dim">{t("stats.xGOnTarget") + " (xGOT)"}</span>
            <span className="text-lg font-bold tabular-nums text-green">
              {awaySummary.totalXgot.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 pt-2">
        <div className="flex items-center justify-between pb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-text-dim">
          <span />
          <div className="flex gap-3">
            <span className="text-cyan">xG</span>
            <span className="text-green/80">xGOT</span>
          </div>
        </div>
        <OutcomeRow
          label={`${homeTeamName} ${t("cards.win")}`}
          xgValue={pct(outcome.homeWin)}
          xgotValue={pct(outcomeXgot.homeWin)}
        />
        <OutcomeRow
          label={t("cards.draw")}
          xgValue={pct(outcome.draw)}
          xgotValue={pct(outcomeXgot.draw)}
          tone="draw"
        />
        <OutcomeRow
          label={`${awayTeamName} ${t("cards.win")}`}
          xgValue={pct(outcome.awayWin)}
          xgotValue={pct(outcomeXgot.awayWin)}
          tone="away"
        />
      </div>

      <div className="mt-2 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
        <div className="bg-cyan" style={{ width: `${outcome.homeWin * 100}%` }} />
        <div className="bg-yellow" style={{ width: `${outcome.draw * 100}%` }} />
        <div className="bg-red" style={{ width: `${outcome.awayWin * 100}%` }} />
      </div>
      <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full opacity-50">
        <div className="bg-cyan" style={{ width: `${outcomeXgot.homeWin * 100}%` }} />
        <div className="bg-yellow" style={{ width: `${outcomeXgot.draw * 100}%` }} />
        <div className="bg-red" style={{ width: `${outcomeXgot.awayWin * 100}%` }} />
      </div>
    </Card>
  );
}

type OutcomeRowProps = {
  label: string;
  xgValue: string;
  xgotValue: string;
  tone?: "home" | "draw" | "away";
};

function OutcomeRow({ label, xgValue, xgotValue, tone }: OutcomeRowProps) {
  const toneClass = tone === "draw" ? "text-yellow" : tone === "away" ? "text-red" : "text-cyan";
  return (
    <div className="flex items-center justify-between border-b border-border/50 py-2 text-sm last:border-b-0">
      <span className="text-text-dim">{label}</span>
      <div className="flex items-baseline gap-3 tabular-nums">
        <span className={`text-lg font-bold ${toneClass}`}>{xgValue}</span>
        <span className="text-sm font-semibold text-text-dim">{xgotValue}</span>
      </div>
    </div>
  );
}
