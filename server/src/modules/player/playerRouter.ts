import express from "express";
import playerActions from "./playerActions";

const router = express.Router();

router.get("/", playerActions.browse);
router.get("/:id", playerActions.read);
router.post("/", playerActions.add);
router.put("/:id", playerActions.edit);
router.delete("/:id", playerActions.destroy);

export default router;
