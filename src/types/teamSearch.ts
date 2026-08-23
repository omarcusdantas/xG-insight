export interface TeamSearchEntity {
  id: number;
  name: string;
  national: boolean;
  gender: string;
  sport: { slug: string };
  country: { name: string };
}

export interface TeamSearchResult {
  entity: TeamSearchEntity;
}

export interface TeamSearchResponse {
  results: TeamSearchResult[];
}
