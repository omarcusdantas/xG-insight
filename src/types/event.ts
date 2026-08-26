export type MatchStatusType = "inprogress" | "finished" | "notstarted" | "postponed";

export interface EventInfo {
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  status: MatchStatusType;
  startTimestamp: number;
  tournamentName: string;
}

export interface EventResponse {
  event: {
    homeTeam: { name: string };
    awayTeam: { name: string };
    homeScore: { current: number };
    awayScore: { current: number };
    status: { type: string };
    startTimestamp: number;
    tournament: { name: string; uniqueTournament: { name: string } };
  };
}
