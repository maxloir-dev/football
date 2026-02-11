import express from "express";
import teamRouter from "./modules/item/team/teamRouter";
import leagueRouter from "./modules/league/leagueRouter";
import matchRouter from "./modules/match/matchRouter";
import playerActions from "./modules/player/playerActions";
import playerRouter from "./modules/player/playerRouter";
import standingRouter from "./modules/standing/standingRouter";

const router = express.Router();

router.use("/teams", teamRouter);
router.use("/players", playerRouter);
router.use("/matches", matchRouter);
router.use("/leagues", leagueRouter);
router.use("/standings", standingRouter);

// Route imbriquée : joueurs d'une équipe
router.get("/teams/:teamId/players", playerActions.browseByTeam);

export default router;
