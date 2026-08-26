import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Modal } from "../ui/Modal";
import { fetchTeamLastEvents } from "../../lib/fetchTeamLastEvents";
import type { TeamEvent } from "../../types/teamLastEvents";

interface MatchesModalProps {
  open: boolean;
  onClose: () => void;
  teamId: number | null;
  teamName: string | null;
}

export function MatchesModal({ open, onClose, teamId, teamName }: MatchesModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState<TeamEvent[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || teamId === null) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setEvents(null);

    fetchTeamLastEvents(teamId)
      .then((data) => {
        if (!controller.signal.aborted) setEvents(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(t("errors.loadFailed"));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [open, teamId, t]);

  return (
    <Modal open={open} onClose={onClose} title={t("matchesModal.title")}>
      <div className="border-b border-border p-4">
        <p className="text-xs text-text-dim">
          {teamName ? (
            <>
              <span className="font-semibold text-text">{teamName}</span>
              {" · "}
            </>
          ) : null}
          {t("matchesModal.notice")}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <p className="text-sm text-text-dim">{t("matchesModal.loading")}</p>
        ) : error ? (
          <p role="alert" className="text-sm text-red">
            {error}
          </p>
        ) : events === null ? null : events.length === 0 ? (
          <p className="text-sm text-text-dim">{t("matchesModal.empty")}</p>
        ) : (
          <ul role="list" className="flex flex-col gap-1">
            {events.map((event) => (
              <MatchRow key={event.id} event={event} onNavigate={onClose} navigate={navigate} />
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}

interface MatchRowProps {
  event: TeamEvent;
  onNavigate: () => void;
  navigate: ReturnType<typeof useNavigate>;
}

function MatchRow({ event, onNavigate, navigate }: MatchRowProps) {
  const { t } = useTranslation();
  const date = new Date(event.startTimestamp * 1000);
  const dateLabel = date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeLabel = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          onNavigate();
          navigate(`/match/${event.id}`);
        }}
        className="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-2 text-sm">
          <span className="min-w-0 truncate text-right font-medium text-cyan">
            {event.homeTeam.name}
          </span>
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-text-dim">
            {t("recentGames.vs")}
          </span>
          <span className="min-w-0 truncate text-left font-medium text-red">
            {event.awayTeam.name}
          </span>
          <span className="min-w-0 truncate text-right text-[11px] text-text-dim">
            {event.tournament.uniqueTournament.name}
          </span>
          <span />
          <span className="shrink-0 text-left text-[11px] tabular-nums text-text-dim">
            {dateLabel} · {timeLabel}
          </span>
        </div>
      </button>
    </li>
  );
}
