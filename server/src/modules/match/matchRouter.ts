import express from "express";
import matchActions from "./matchActions";

const router = express.Router();

router.get("/", matchActions.browse);
router.get("/:id", matchActions.read);
router.post("/", matchActions.add);
router.put("/:id", matchActions.edit);
router.delete("/:id", matchActions.destroy);

export default router;
