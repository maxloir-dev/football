import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import client from "../../../config/database";
import type { Team, TeamWithLeague } from "../../../types/express/teamTypes";

class TeamRepository {
  async readAll(): Promise<TeamWithLeague[]> {
    const [rows] = await client.query<RowDataPacket[]>(
      `SELECT t.*, l.name as league_name 
       FROM teams t 
       LEFT JOIN leagues l ON t.league_id = l.id`,
    );
    return rows as TeamWithLeague[];
  }

  async read(id: number): Promise<TeamWithLeague | null> {
    const [rows] = await client.query<RowDataPacket[]>(
      `SELECT t.*, l.name as league_name 
       FROM teams t 
       LEFT JOIN leagues l ON t.league_id = l.id 
       WHERE t.id = ?`,
      [id],
    );
    return (rows[0] as TeamWithLeague) || null;
  }

  async create(team: Omit<Team, "id" | "created_at">): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      "INSERT INTO teams (name, city, stadium, league_id) VALUES (?, ?, ?, ?)",
      [team.name, team.city, team.stadium, team.league_id],
    );
    return result.insertId;
  }

  async update(id: number, team: Partial<Team>): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      "UPDATE teams SET name = ?, city = ?, stadium = ? WHERE id = ?",
      [team.name, team.city, team.stadium, id],
    );
    return result.affectedRows;
  }

  async delete(id: number): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      "DELETE FROM teams WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new TeamRepository();
