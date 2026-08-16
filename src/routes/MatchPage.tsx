import { isRouteErrorResponse, useLoaderData, useParams, useRouteError } from "react-router";
import { MatchProvider } from "../context/MatchContext";
import { useMatchContext } from "../hooks/useMatchContext";
import { FilterDrawer } from "../components/layout/FilterDrawer";
import { MatchOutcomeCard } from "../components/cards/MatchOutcomeCard";
import { ShotsCard } from "../components/cards/ShotsCard";
import { TeamSelector } from "../components/layout/TeamSelector";
import { TeamStatsCard } from "../components/cards/TeamStatsCard";
import { useMatchStats } from "../hooks/useMatchStats";
import { useRootContext } from "../hooks/useRootContext";
import { useTranslation } from "react-i18next";

import type { Shot } from "../types/shotmap";

export function MatchPage() {
  const shots = useLoaderData() as Shot[];
  const { id } = useParams();

  return (
    <MatchProvider key={id} shots={shots}>
      <MatchPageContent />
    </MatchProvider>
  );
}

function MatchPageContent() {
  const { team } = useMatchContext();
  const { matchOutcomeXg, matchOutcomeXgot, homeSummary, awaySummary } = useMatchStats();
  const { filtersOpen, setFiltersOpen } = useRootContext();
  const summary = team === "home" ? homeSummary : awaySummary;

  return (
    <main className="mx-auto w-full max-w-200 flex flex-col gap-4 px-4 pb-12 pt-4">
      <MatchOutcomeCard
        outcome={matchOutcomeXg}
        outcomeXgot={matchOutcomeXgot}
        homeSummary={homeSummary}
        awaySummary={awaySummary}
      />
      <TeamSelector />
      <TeamStatsCard summary={summary} titleAccent={team} />
      <ShotsCard />
      <FilterDrawer open={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </main>
  );
}

export function MatchPageError() {
  const { t } = useTranslation();
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.status === 404
      ? t("errors.notFound")
      : t("errors.serverError")
    : t("errors.loadFailed");
  return (
    <main className="mx-auto w-full max-w-200 flex flex-col gap-3 px-4 py-10 text-center">
      <p role="alert" className="text-sm text-red">
        {message}
      </p>
    </main>
  );
}
