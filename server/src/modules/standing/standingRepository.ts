import type { RowDataPacket } from "mysql2/promise";
import client from "../../config/database";
import type { Standing } from "../../types/express/teamTypes";

class StandingRepository {
  async calculateStandings(leagueId?: number): Promise<Standing[]> {
    // Construire la requête SQL pour calculer le classement
    let query = `
      SELECT 
        t.id as team_id,
        t.name as team_name,
        COUNT(m.id) as played,
        SUM(CASE 
          WHEN (m.home_team_id = t.id AND m.home_score > m.away_score) OR 
               (m.away_team_id = t.id AND m.away_score > m.home_score) 
          THEN 1 ELSE 0 
        END) as won,
        SUM(CASE 
          WHEN m.home_score = m.away_score 
          THEN 1 ELSE 0 
        END) as drawn,
        SUM(CASE 
          WHEN (m.home_team_id = t.id AND m.home_score < m.away_score) OR 
               (m.away_team_id = t.id AND m.away_score < m.home_score) 
          THEN 1 ELSE 0 
        END) as lost,
        SUM(CASE 
          WHEN m.home_team_id = t.id THEN m.home_score 
          WHEN m.away_team_id = t.id THEN m.away_score 
          ELSE 0 
        END) as goals_for,
        SUM(CASE 
          WHEN m.home_team_id = t.id THEN m.away_score 
          WHEN m.away_team_id = t.id THEN m.home_score 
          ELSE 0 
        END) as goals_against,
        SUM(CASE 
          WHEN m.home_team_id = t.id THEN m.home_score - m.away_score
          WHEN m.away_team_id = t.id THEN m.away_score - m.home_score
          ELSE 0 
        END) as goal_difference,
        SUM(CASE 
          WHEN (m.home_team_id = t.id AND m.home_score > m.away_score) OR 
               (m.away_team_id = t.id AND m.away_score > m.home_score) 
          THEN 3
          WHEN m.home_score = m.away_score 
          THEN 1
          ELSE 0 
        END) as points
      FROM teams t
      LEFT JOIN matches m ON t.id = m.home_team_id OR t.id = m.away_team_id
    `;

    const params: number[] = [];

    // Filtrer par ligue si spécifié
    if (leagueId) {
      query += " WHERE t.league_id = ?";
      params.push(leagueId);
    }

    query += `
      GROUP BY t.id, t.name
      ORDER BY points DESC, goal_difference DESC, goals_for DESC
    `;

    const [rows] = await client.query<RowDataPacket[]>(query, params);
    return rows as Standing[];
  }
}

export default new StandingRepository();
