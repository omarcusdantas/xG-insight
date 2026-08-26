export interface TeamLastEventsTeam {
  id: number;
  name: string;
}

export interface TeamLastEventsTournament {
  name: string;
  uniqueTournament: { name: string };
}

export interface TeamEvent {
  id: number;
  startTimestamp: number;
  homeTeam: TeamLastEventsTeam;
  awayTeam: TeamLastEventsTeam;
  tournament: TeamLastEventsTournament;
  hasXg: boolean;
}

export interface TeamLastEventsResponse {
  events: TeamEvent[];
}
