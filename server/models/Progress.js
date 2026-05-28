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
    // Daily activity for heatmap
    dailyActivity: [
      {
        date: String,      // Format: YYYY-MM-DD
        count: Number,     // How many completed that day
        _id: false,
      },
    ],
  },
  {
    timestamps: true,     // createdAt, updatedAt
  }
);

// Create model
const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
