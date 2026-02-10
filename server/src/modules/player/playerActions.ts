import type { RequestHandler } from "express";
import playerRepository from "./playerRepository";

// GET /api/players - Tous les joueurs
const browse: RequestHandler = async (req, res, next) => {
  try {
    const players = await playerRepository.readAll();
    res.json(players);
  } catch (err) {
    next(err);
  }
};

// GET /api/players/:id - Un joueur
const read: RequestHandler = async (req, res, next) => {
  try {
    const player = await playerRepository.read(Number(req.params.id));
    if (!player) {
      res.status(404).json({ message: "Player not found" });
      return;
    }
    res.json(player);
  } catch (err) {
    next(err);
  }
};

// GET /api/teams/:teamId/players - Joueurs d'une équipe
const browseByTeam: RequestHandler = async (req, res, next) => {
  try {
    const players = await playerRepository.readByTeam(
      Number(req.params.teamId),
    );
    res.json(players);
  } catch (err) {
    next(err);
  }
};

// POST /api/players - Créer un joueur
const add: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, position, number, team_id } = req.body;

    if (!firstname || !lastname || !team_id) {
      res.status(400).json({
        message: "Firstname, lastname and team_id are required",
      });
      return;
    }

    const insertId = await playerRepository.create({
      firstname,
      lastname,
      position,
      number,
      team_id,
    });

    res.status(201).json({ id: insertId, message: "Player created" });
  } catch (err) {
    next(err);
  }
};

// PUT /api/players/:id - Modifier un joueur
const edit: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, position, number } = req.body;
    const affectedRows = await playerRepository.update(Number(req.params.id), {
      firstname,
      lastname,
      position,
      number,
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: "Player not found" });
      return;
    }

    res.json({ message: "Player updated" });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/players/:id - Supprimer un joueur
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const affectedRows = await playerRepository.delete(Number(req.params.id));

    if (affectedRows === 0) {
      res.status(404).json({ message: "Player not found" });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { browse, read, browseByTeam, add, edit, destroy };
