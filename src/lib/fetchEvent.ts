import type { EventInfo, EventResponse } from "../types/event";

export async function fetchEvent(id: string): Promise<EventInfo> {
  const url = `https://www.sofascore.com/api/v1/event/${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    referrerPolicy: "no-referrer",
  });

  if (!res.ok) {
    throw new Response("Failed to load event", { status: res.status });
  }

  const data = (await res.json()) as EventResponse;
  return {
    homeTeamName: data.event.homeTeam.name,
    awayTeamName: data.event.awayTeam.name,
  };
}
