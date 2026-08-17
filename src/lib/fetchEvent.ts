import type { EventInfo, EventResponse, MatchStatusType } from "../types/event";

const VALID_STATUSES = new Set<string>(["inprogress", "finished", "notstarted", "postponed"]);

export async function fetchEvent(id: string): Promise<EventInfo> {
  const url = `https://www.sofascore.com/api/v1/event/${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    referrerPolicy: "no-referrer",
  });

  if (!res.ok) {
    throw new Response("Failed to load event", { status: res.status });
  }

  const data = (await res.json()) as EventResponse;
  const rawStatus = data.event.status.type;
  const status: MatchStatusType = VALID_STATUSES.has(rawStatus)
    ? (rawStatus as MatchStatusType)
    : "notstarted";

  return {
    homeTeamName: data.event.homeTeam.name,
    awayTeamName: data.event.awayTeam.name,
    homeScore: data.event.homeScore.current,
    awayScore: data.event.awayScore.current,
    status,
    startTimestamp: data.event.startTimestamp,
    tournamentName: data.event.tournament.name,
  };
}
