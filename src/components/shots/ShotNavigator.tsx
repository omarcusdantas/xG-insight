import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "../ui/IconButton";
import { useMatchContext } from "../../hooks/useMatchContext";
import { useTeamShots } from "../../hooks/useMatchStats";
import { useTranslation } from "react-i18next";

export function ShotNavigator() {
  const { t } = useTranslation();
  const { shotIndex, prevShot, nextShot } = useMatchContext();
  const shots = useTeamShots();
  const total = shots.length;
  const isFirst = shotIndex <= 0;
  const isLast = shotIndex >= total - 1;

  return (
    <div className="flex items-center justify-between border-b border-border pb-3">
      <IconButton label={t("shot.previous")} onClick={prevShot} disabled={isFirst}>
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </IconButton>
      <span className="min-w-12 text-center text-sm font-semibold tabular-nums text-text-dim">
        {total === 0 ? "0 / 0" : `${shotIndex + 1} / ${total}`}
      </span>
      <IconButton label={t("shot.next")} onClick={nextShot} disabled={isLast}>
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </IconButton>
    </div>
  );
}
