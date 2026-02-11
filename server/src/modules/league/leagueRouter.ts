import express from "express";
import leagueActions from "./leagueActions";

const router = express.Router();

router.get("/", leagueActions.browse);
router.get("/:id", leagueActions.read);
router.post("/", leagueActions.add);
router.put("/:id", leagueActions.edit);
router.delete("/:id", leagueActions.destroy);

export default router;
