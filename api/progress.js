import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../server/config/db.js";
import progressRoutes from "../server/routes/progressRoutes.js";

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL || "https://mern-ai-road-map.vercel.app/",
    ],
    credentials: true,
  }),
);

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/progress", progressRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export default app;
