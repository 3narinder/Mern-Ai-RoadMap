import mongoose from "mongoose";

// Schema for individual check items with completion date
const checkItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

// Schema for daily activity tracking (GitHub-style)
const activitySchema = new mongoose.Schema(
  {
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    // Using a simple identifier for now (can be replaced with userId for auth)
    identifier: {
      type: String,
      required: true,
      unique: true,
      default: "default_user",
    },
    // Store checks as an array of check items with completion dates
    checks: [checkItemSchema],
    // Daily activity for the heatmap
    dailyActivity: [activitySchema],
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
progressSchema.index({ identifier: 1 });
progressSchema.index({ "dailyActivity.date": 1 });

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
