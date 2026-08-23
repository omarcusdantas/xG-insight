import type { TeamPerformanceEvent, TeamPerformanceResponse } from "../types/teamPerformance";

export async function fetchTeamPerformance(teamId: number): Promise<TeamPerformanceEvent[]> {
  const url = `https://www.sofascore.com/api/v1/team/${teamId}/performance`;
  const res = await fetch(url, { referrerPolicy: "no-referrer" });

  if (!res.ok) {
    throw new Response("Failed to load team performance", { status: res.status });
  }

  const data = (await res.json()) as TeamPerformanceResponse;
  return (data.events ?? []).filter((event) => event.hasXg);
}
