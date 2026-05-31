import express from "express";
import {
  clearProgress,
  getActivity,
  getProgress,
  syncProgress,
  toggleProgress,
} from "../controller/progressController.js";

const router = express.Router();

// Base endpoint paths: /api/progress
router.get("/", getProgress);
router.put("/", syncProgress);
router.delete("/", clearProgress);
router.get("/activities", getActivity);

// 🚀 Toggle specific path: POST /api/progress/toggle
router.post("/toggle", toggleProgress);

export default router;
