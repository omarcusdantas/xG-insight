export interface TeamPerformanceTeam {
  id: number;
  name: string;
}

export interface TeamPerformanceTournament {
  name: string;
}

export interface TeamPerformanceEvent {
  id: number;
  startTimestamp: number;
  homeTeam: TeamPerformanceTeam;
  awayTeam: TeamPerformanceTeam;
  tournament: TeamPerformanceTournament;
  hasXg: boolean;
}

export interface TeamPerformanceResponse {
  events: TeamPerformanceEvent[];
}
