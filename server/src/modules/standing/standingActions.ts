import type { RequestHandler } from "express";
import standingRepository from "./standingRepository";

// GET /api/standings - Classement général
// GET /api/standings?league_id=1 - Classement d'une ligue spécifique
const browse: RequestHandler = async (req, res, next) => {
  try {
    const leagueId = req.query.league_id
      ? Number(req.query.league_id)
      : undefined;
    const standings = await standingRepository.calculateStandings(leagueId);
    res.json(standings);
  } catch (err) {
    next(err);
  }
};

export default { browse };
