import { useMatchContext } from "../../hooks/useMatchContext";
import { useTeamShots } from "../../hooks/useMatchStats";
import { useTranslation } from "react-i18next";

import type { ShotType } from "../../types/shotmap";

const SHOT_BADGE: Record<ShotType, string> = {
  goal: "bg-green-soft text-green",
  save: "bg-yellow-soft text-yellow",
  miss: "bg-surface-2 text-text-dim",
  block: "bg-red-soft text-red",
  post: "bg-accent-glow text-accent",
};

export function ShotDetail() {
  const { t } = useTranslation();
  const { shotIndex } = useMatchContext();
  const shots = useTeamShots();
  const shot = shots[shotIndex];

  if (!shot) {
    return <div className="py-8 text-center text-sm text-text-dim">{t("cards.noShots")}</div>;
  }

  return (
    <div className="flex flex-col gap-3 pt-3">
      <Row label={t("shot.player")} value={shot.player.name} emphasis />
      <Row label={t("shot.time")} value={`${shot.time}'`} valueClass="text-accent" />
      <Row label={t("shot.xg")} value={shot.xg.toFixed(2)} valueClass="text-cyan" />
      <Row label={t("shot.xgot")} value={(shot.xgot || 0).toFixed(2)} valueClass="text-green" />
      <ShotResultBadge label={t("shot.result")} shotType={shot.shotType} />
    </div>
  );
}

type RowProps = {
  label: string;
  value: string;
  valueClass?: string;
  emphasis?: boolean;
};

function Row({ label, value, valueClass = "", emphasis }: RowProps) {
  return (
    <div className="flex items-center justify-between border-t border-border/50 pt-3 first:border-t-0 first:pt-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">{label}</span>
      <span
        className={`text-base font-semibold tabular-nums ${valueClass} ${emphasis ? "text-text" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

type ShotResultBadgeProps = {
  label: string;
  shotType: ShotType;
};

function ShotResultBadge({ label, shotType }: ShotResultBadgeProps) {
  return (
    <div className="flex items-center justify-between border-t border-border pt-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">{label}</span>
      <span
        className={`inline-block rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${SHOT_BADGE[shotType]}`}
      >
        {shotType}
      </span>
    </div>
  );
}
