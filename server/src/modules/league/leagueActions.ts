import type { RequestHandler } from "express";
import leagueRepository from "./leagueRepository";

// GET /api/leagues - Toutes les ligues
const browse: RequestHandler = async (req, res, next) => {
  try {
    const leagues = await leagueRepository.readAll();
    res.json(leagues);
  } catch (err) {
    next(err);
  }
};

// GET /api/leagues/:id - Une ligue
const read: RequestHandler = async (req, res, next) => {
  try {
    const league = await leagueRepository.read(Number(req.params.id));
    if (!league) {
      res.status(404).json({ message: "League not found" });
      return;
    }
    res.json(league);
  } catch (err) {
    next(err);
  }
};

// POST /api/leagues - Créer une ligue
const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, country, level } = req.body;

    if (!name || !country) {
      res.status(400).json({
        message: "Name and country are required",
      });
      return;
    }

    const insertId = await leagueRepository.create({ name, country, level });
    res.status(201).json({ id: insertId, message: "League created" });
  } catch (err) {
    next(err);
  }
};

// PUT /api/leagues/:id - Modifier une ligue
const edit: RequestHandler = async (req, res, next) => {
  try {
    const { name, country, level } = req.body;
    const affectedRows = await leagueRepository.update(Number(req.params.id), {
      name,
      country,
      level,
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: "League not found" });
      return;
    }

    res.json({ message: "League updated" });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/leagues/:id - Supprimer une ligue
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const affectedRows = await leagueRepository.delete(Number(req.params.id));

    if (affectedRows === 0) {
      res.status(404).json({ message: "League not found" });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
