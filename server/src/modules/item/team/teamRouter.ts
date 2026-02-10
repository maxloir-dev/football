import express from "express";
import teamActions from "./teamActions";

const router = express.Router();

router.get("/", teamActions.browse);
router.get("/:id", teamActions.read);
router.post("/", teamActions.add);
router.put("/:id", teamActions.edit);
router.delete("/:id", teamActions.destroy);

export default router;
