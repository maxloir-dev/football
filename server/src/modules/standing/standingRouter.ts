import express from "express";
import standingActions from "./standingActions";

const router = express.Router();

router.get("/", standingActions.browse);

export default router;
