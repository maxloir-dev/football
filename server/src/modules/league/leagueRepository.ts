import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import client from "../../config/database";
import type { League } from "../../types/express/teamTypes";

class LeagueRepository {
  // Toutes les ligues
  async readAll(): Promise<League[]> {
    const [rows] = await client.query<RowDataPacket[]>(
      "SELECT * FROM leagues ORDER BY level ASC",
    );
    return rows as League[];
  }

  // Une ligue par ID
  async read(id: number): Promise<League | null> {
    const [rows] = await client.query<RowDataPacket[]>(
      "SELECT * FROM leagues WHERE id = ?",
      [id],
    );
    return (rows[0] as League) || null;
  }

  // Créer une ligue
  async create(league: Omit<League, "id" | "created_at">): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      "INSERT INTO leagues (name, country, level) VALUES (?, ?, ?)",
      [league.name, league.country, league.level ?? 1],
    );
    return result.insertId;
  }

  // Modifier une ligue
  async update(id: number, league: Partial<League>): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      "UPDATE leagues SET name = ?, country = ?, level = ? WHERE id = ?",
      [league.name, league.country, league.level, id],
    );
    return result.affectedRows;
  }

  // Supprimer une ligue
  async delete(id: number): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      "DELETE FROM leagues WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new LeagueRepository();
