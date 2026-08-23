import type { TeamSearchResponse, TeamSearchResult } from "../types/teamSearch";

const FOOTBALL_SLUG = "football";
const JUNIOR_PATTERN = /\bu\s*\d{1,2}\b/i;

export async function searchTeams(query: string): Promise<TeamSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const url = `https://www.sofascore.com/api/v1/search/teams?q=${encodeURIComponent(
    trimmed
  )}&page=0`;
  const res = await fetch(url, { referrerPolicy: "no-referrer" });

  if (!res.ok) {
    throw new Response("Failed to search teams", { status: res.status });
  }

  const data = (await res.json()) as TeamSearchResponse;
  return (data.results ?? []).filter(isFootballSeniorTeam);
}

function isFootballSeniorTeam(result: TeamSearchResult): boolean {
  const team = result.entity;
  if (team.sport?.slug !== FOOTBALL_SLUG) return false;
  if (JUNIOR_PATTERN.test(team.name)) return false;
  return true;
}
