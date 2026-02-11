export interface Team {
  id?: number;
  name: string;
  city?: string;
  stadium?: string;
  league_id: number;
  created_at?: Date;
}

export interface TeamWithLeague extends Team {
  league_name?: string;
}

export interface Player {
  id?: number;
  firstname: string;
  lastname: string;
  position?: string;
  number?: number;
  team_id: number;
  created_at?: Date;
}

export interface Match {
  id?: number;
  home_team_id: number;
  away_team_id: number;
  home_score?: number;
  away_score?: number;
  match_date: Date;
  created_at?: Date;
}

export interface League {
  id?: number;
  name: string;
  country: string;
  level?: number;
  created_at?: Date;
}
export interface Match {
  id?: number;
  home_team_id: number;
  away_team_id: number;
  home_score?: number;
  away_score?: number;
  match_date: Date;
  created_at?: Date;
}

export interface MatchWithTeams extends Match {
  home_team_name?: string;
  away_team_name?: string;
}

export interface Standing {
  team_id: number;
  team_name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
}
