import type { RequestHandler } from "express";
import matchRepository from "./matchRepository";

// GET /api/matches - Tous les matchs
const browse: RequestHandler = async (req, res, next) => {
  try {
    const matches = await matchRepository.readAll();
    res.json(matches);
  } catch (err) {
    next(err);
  }
};

// GET /api/matches/:id - Un match
const read: RequestHandler = async (req, res, next) => {
  try {
    const match = await matchRepository.read(Number(req.params.id));
    if (!match) {
      res.status(404).json({ message: "Match not found" });
      return;
    }
    res.json(match);
  } catch (err) {
    next(err);
  }
};

// POST /api/matches - Créer un match
const add: RequestHandler = async (req, res, next) => {
  try {
    const { home_team_id, away_team_id, home_score, away_score, match_date } =
      req.body;

    if (!home_team_id || !away_team_id || !match_date) {
      res.status(400).json({
        message: "home_team_id, away_team_id and match_date are required",
      });
      return;
    }

    // Empêcher une équipe de jouer contre elle-même
    if (home_team_id === away_team_id) {
      res.status(400).json({
        message: "A team cannot play against itself",
      });
      return;
    }

    const insertId = await matchRepository.create({
      home_team_id,
      away_team_id,
      home_score,
      away_score,
      match_date,
    });

    res.status(201).json({ id: insertId, message: "Match created" });
  } catch (err) {
    next(err);
  }
};

// PUT /api/matches/:id - Modifier un match (surtout le score)
const edit: RequestHandler = async (req, res, next) => {
  try {
    const { home_score, away_score, match_date } = req.body;
    const affectedRows = await matchRepository.update(Number(req.params.id), {
      home_score,
      away_score,
      match_date,
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: "Match not found" });
      return;
    }

    res.json({ message: "Match updated" });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/matches/:id - Supprimer un match
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const affectedRows = await matchRepository.delete(Number(req.params.id));

    if (affectedRows === 0) {
      res.status(404).json({ message: "Match not found" });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
