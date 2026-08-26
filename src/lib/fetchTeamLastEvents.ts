import type { TeamEvent, TeamLastEventsResponse } from "../types/teamLastEvents";

export async function fetchTeamLastEvents(teamId: number): Promise<TeamEvent[]> {
  const url = `https://www.sofascore.com/api/v1/team/${teamId}/events/last/0`;
  const res = await fetch(url, { referrerPolicy: "no-referrer" });

  if (!res.ok) {
    throw new Response("Failed to load team last events", { status: res.status });
  }

  const data = (await res.json()) as TeamLastEventsResponse;
  return (data.events ?? []).filter((event) => event.hasXg).reverse();
}
