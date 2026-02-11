import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import client from "../../config/database";
import type { Match, MatchWithTeams } from "../../types/express/teamTypes";

class MatchRepository {
  // Tous les matchs avec noms des équipes
  async readAll(): Promise<MatchWithTeams[]> {
    const [rows] = await client.query<RowDataPacket[]>(
      `SELECT m.*, 
              ht.name as home_team_name, 
              at.name as away_team_name
       FROM matches m
       LEFT JOIN teams ht ON m.home_team_id = ht.id
       LEFT JOIN teams at ON m.away_team_id = at.id
       ORDER BY m.match_date DESC`,
    );
    return rows as MatchWithTeams[];
  }

  // Un match par ID
  async read(id: number): Promise<MatchWithTeams | null> {
    const [rows] = await client.query<RowDataPacket[]>(
      `SELECT m.*, 
              ht.name as home_team_name, 
              at.name as away_team_name
       FROM matches m
       LEFT JOIN teams ht ON m.home_team_id = ht.id
       LEFT JOIN teams at ON m.away_team_id = at.id
       WHERE m.id = ?`,
      [id],
    );
    return (rows[0] as MatchWithTeams) || null;
  }

  // Créer un match
  async create(match: Omit<Match, "id" | "created_at">): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      `INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, match_date) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        match.home_team_id,
        match.away_team_id,
        match.home_score ?? 0,
        match.away_score ?? 0,
        match.match_date,
      ],
    );
    return result.insertId;
  }

  // Modifier un match (notamment le score)
  async update(id: number, match: Partial<Match>): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      `UPDATE matches 
       SET home_score = ?, away_score = ?, match_date = ?
       WHERE id = ?`,
      [match.home_score, match.away_score, match.match_date, id],
    );
    return result.affectedRows;
  }

  // Supprimer un match
  async delete(id: number): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      "DELETE FROM matches WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new MatchRepository();
