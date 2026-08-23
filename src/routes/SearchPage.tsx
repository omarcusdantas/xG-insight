import { type FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { RecentGamesCard } from "../components/cards/RecentGamesCard";
import { TeamsModal } from "../components/search/TeamsModal";
import { MatchesModal } from "../components/search/MatchesModal";
import { extractMatchId } from "../lib/parseMatchUrl";
import type { TeamSearchResult } from "../types/teamSearch";

export function SearchPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [teamQuery, setTeamQuery] = useState("");
  const [matchesOpen, setMatchesOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamSearchResult["entity"] | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError(t("search.invalid"));
      return;
    }

    const id = extractMatchId(trimmed);
    if (id) {
      setError(null);
      navigate(`/match/${id}`);
      return;
    }

    setError(null);
    setTeamQuery(trimmed);
    setTeamsOpen(true);
  }

  return (
    <main className="mx-auto flex w-full max-w-200 flex-1 flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-text">{t("search.title")}</h2>
        <p className="text-sm text-text-dim">{t("search.subtitle")}</p>
      </div>
      <form
        onSubmit={submit}
        className="flex flex-col gap-3 rounded-(--radius-card) border border-border bg-surface p-5 shadow-(--shadow-card)"
        noValidate
      >
        <label className="flex flex-col gap-2">
          <span className="sr-only">{t("search.placeholder")}</span>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-dim"
            />
            <input
              type="search"
              autoComplete="off"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              placeholder={t("search.placeholder")}
              className="w-full rounded-lg border border-border bg-surface-2 py-3 pl-10 pr-3 text-base text-text outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "search-error" : undefined}
            />
          </div>
        </label>
        {error ? (
          <p id="search-error" role="alert" className="text-sm text-red">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="primary">
          {t("search.cta")}
        </Button>
      </form>

      <RecentGamesCard />

      <TeamsModal
        open={teamsOpen}
        onClose={() => setTeamsOpen(false)}
        query={teamQuery}
        onSelectTeam={(team) => {
          setSelectedTeam(team);
          setTeamsOpen(false);
          setMatchesOpen(true);
        }}
      />
      <MatchesModal
        open={matchesOpen}
        onClose={() => setMatchesOpen(false)}
        teamId={selectedTeam?.id ?? null}
        teamName={selectedTeam?.name ?? null}
      />
    </main>
  );
}
