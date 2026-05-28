import express from "express";
import {
  clearProgress,
  getActivity,
  getProgress,
  syncProgress,
  toggleProgress,
} from "../controller/progressController.js";

const router = express.Router();

// Elegant structural mapping
router.route("/").get(getProgress).put(syncProgress).delete(clearProgress);

router.post("/toggle", toggleProgress);
router.get("/activity", getActivity);

export default router;
