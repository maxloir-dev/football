import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import client from "../../config/database";
import type { Player } from "../../types/express/teamTypes";

class PlayerRepository {
  // Tous les joueurs
  async readAll(): Promise<Player[]> {
    const [rows] = await client.query<RowDataPacket[]>(
      `SELECT p.*, t.name as team_name 
       FROM players p 
       LEFT JOIN teams t ON p.team_id = t.id`,
    );
    return rows as Player[];
  }

  // Un joueur par ID
  async read(id: number): Promise<Player | null> {
    const [rows] = await client.query<RowDataPacket[]>(
      `SELECT p.*, t.name as team_name 
       FROM players p 
       LEFT JOIN teams t ON p.team_id = t.id 
       WHERE p.id = ?`,
      [id],
    );
    return (rows[0] as Player) || null;
  }

  // Joueurs d'une équipe
  async readByTeam(teamId: number): Promise<Player[]> {
    const [rows] = await client.query<RowDataPacket[]>(
      `SELECT p.* 
       FROM players p 
       WHERE p.team_id = ?
       ORDER BY p.number ASC`,
      [teamId],
    );
    return rows as Player[];
  }

  // Créer un joueur
  async create(player: Omit<Player, "id" | "created_at">): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      `INSERT INTO players (firstname, lastname, position, number, team_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        player.firstname,
        player.lastname,
        player.position,
        player.number,
        player.team_id,
      ],
    );
    return result.insertId;
  }

  // Modifier un joueur
  async update(id: number, player: Partial<Player>): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      `UPDATE players 
       SET firstname = ?, lastname = ?, position = ?, number = ? 
       WHERE id = ?`,
      [player.firstname, player.lastname, player.position, player.number, id],
    );
    return result.affectedRows;
  }

  // Supprimer un joueur
  async delete(id: number): Promise<number> {
    const [result] = await client.query<ResultSetHeader>(
      "DELETE FROM players WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new PlayerRepository();
