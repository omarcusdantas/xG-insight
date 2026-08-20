import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useRecentGames } from "../../hooks/useRecentGames";
import type { RecentGame } from "../../hooks/useRecentGames";

export function RecentGamesCard() {
  const { t } = useTranslation();
  const { games, clear } = useRecentGames();

  if (games.length === 0) {
    return (
      <section className="flex flex-1 flex-col rounded-(--radius-card) border border-dashed border-border bg-transparent p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-text-dim">
          {t("recentGames.title")}
        </h3>
        <p className="text-sm text-text-dim">{t("recentGames.empty")}</p>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col rounded-(--radius-card) border border-dashed border-border bg-transparent p-4">
      <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-text-dim">
          {t("recentGames.title")}
        </h3>
        <Button variant="ghost" onClick={clear} className="gap-1.5 px-2 py-1 text-xs">
          <Trash2 className="h-3.5 w-3.5" />
          {t("recentGames.clear")}
        </Button>
      </div>
      <ul className="flex flex-1 min-h-0 flex-col gap-1 overflow-y-auto" role="list">
        {games.map((game) => (
          <RecentGameRow key={game.eventId} game={game} />
        ))}
      </ul>
    </section>
  );
}

function RecentGameRow({ game }: { game: RecentGame }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <li>
      <button
        type="button"
        onClick={() => navigate(`/match/${game.eventId}`)}
        className="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-2 text-sm">
          <span className="min-w-0 truncate text-right font-medium text-cyan">
            {game.homeTeamName}
          </span>
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-text-dim">
            {t("recentGames.vs")}
          </span>
          <span className="min-w-0 truncate text-left font-medium text-red">
            {game.awayTeamName}
          </span>
          <span className="min-w-0 truncate text-right text-[11px] text-text-dim">
            {game.tournamentName}
          </span>
          <span />
          <span className="shrink-0 text-left text-[11px] tabular-nums text-text-dim">
            {game.date}
          </span>
        </div>
      </button>
    </li>
  );
}
