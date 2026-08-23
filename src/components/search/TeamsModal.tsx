import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../ui/Modal";
import { searchTeams } from "../../lib/searchTeams";
import type { TeamSearchResult } from "../../types/teamSearch";

interface TeamsModalProps {
  open: boolean;
  onClose: () => void;
  query: string;
  onSelectTeam: (team: TeamSearchResult["entity"]) => void;
}

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; results: TeamSearchResult[] };

export function TeamsModal({ open, onClose, query, onSelectTeam }: TeamsModalProps) {
  const { t } = useTranslation();
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    if (!open) {
      setState({ status: "idle" });
      return;
    }
    const trimmed = query.trim();
    if (!trimmed) {
      setState({ status: "idle" });
      return;
    }

    const controller = new AbortController();
    setState({ status: "loading" });
    searchTeams(trimmed)
      .then((results) => {
        if (!controller.signal.aborted) setState({ status: "ready", results });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setState({ status: "error", message: t("errors.loadFailed") });
      });

    return () => controller.abort();
  }, [open, query, t]);

  return (
    <Modal open={open} onClose={onClose} title={t("teamsModal.title")}>
      <div className="flex-1 overflow-y-auto p-4">
        {state.status === "idle" ? (
          <p className="text-sm text-text-dim">{t("teamsModal.empty")}</p>
        ) : state.status === "loading" ? (
          <p className="text-sm text-text-dim">{t("teamsModal.loading")}</p>
        ) : state.status === "error" ? (
          <p role="alert" className="text-sm text-red">
            {state.message}
          </p>
        ) : state.results.length === 0 ? (
          <p className="text-sm text-text-dim">{t("teamsModal.empty")}</p>
        ) : (
          <ul role="list" className="flex flex-col gap-1">
            {state.results.map((result) => {
              const team = result.entity;
              return (
                <li key={team.id}>
                  <button
                    type="button"
                    onClick={() => onSelectTeam(team)}
                    className="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <span className="text-sm font-medium text-text">{team.name}</span>
                    <span className="text-xs text-text-dim">
                      {team.national ? t("teamsModal.national") : team.country.name}
                      {team.gender === "F" ? ` · ${t("teamsModal.female")}` : ""}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Modal>
  );
}
