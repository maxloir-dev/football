import type { RequestHandler } from "express";
import teamRepository from "./teamRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const teams = await teamRepository.readAll();
    res.json(teams);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const team = await teamRepository.read(Number(req.params.id));
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    res.json(team);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, city, stadium, league_id } = req.body;

    if (!name || !league_id) {
      res.status(400).json({ message: "Name and league_id are required" });
      return;
    }

    const insertId = await teamRepository.create({
      name,
      city,
      stadium,
      league_id,
    });
    res.status(201).json({ id: insertId, message: "Team created" });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { name, city, stadium } = req.body;
    const affectedRows = await teamRepository.update(Number(req.params.id), {
      name,
      city,
      stadium,
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    res.json({ message: "Team updated" });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const affectedRows = await teamRepository.delete(Number(req.params.id));

    if (affectedRows === 0) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
