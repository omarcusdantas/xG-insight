export interface EventInfo {
  homeTeamName: string;
  awayTeamName: string;
}

export interface EventResponse {
  event: {
    homeTeam: { name: string };
    awayTeam: { name: string };
  };
}
