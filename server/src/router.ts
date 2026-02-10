import express from "express";
import teamRouter from "./modules/item/team/teamRouter";
import playerActions from "./modules/player/playerActions";
import playerRouter from "./modules/player/playerRouter";

const router = express.Router();

router.use("/teams", teamRouter);
router.use("/players", playerRouter);

// Route imbriquée : joueurs d'une équipe
router.get("/teams/:teamId/players", playerActions.browseByTeam);

export default router;
