import mongoose from "mongoose";

// Schema definition for storing checkbox progress
const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      default: "default_user",
      index: true,
    },
    // Checkbox states: { "item-1": true, "item-2": false }
    checks: {
      type: Map,
      of: Boolean,
      default: {},
    },
    // Completion timestamps: { "item-1": "2026-05-28T..." }
    completionDates: {
      type: Map,
      of: String,
      default: {},
    },
    // Daily activity for heatmap: [{ date: "2026-05-28" }]
    dailyActivity: [
      {
        date: { type: String, required: true },
        count: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Create model
const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
