import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import progressRoutes from "./routes/progressRoutes.js";

// 🛠️ Handle ES Module directory paths dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 SMART ENV CONFIG: Looks in root directory first, falls back to current directory
dotenv.config(); // Reads root .env if running from project root
dotenv.config({ path: path.join(__dirname, "../.env") }); // Backup check for parent directory
dotenv.config({ path: path.join(__dirname, ".env") }); // Backup check for internal server directory

const app = express();
const PORT = process.env.PORT || 5000;

// 🌍 DYNAMIC CORS: Allow local development AND production domains
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // Useful fallback option for Vercel production
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or serverless internal loops)
      if (!origin) return callback(null, true);

      // Allow local development or matches with your deployed dashboard
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === "production"
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy violation"), false);
    },
    credentials: true,
  }),
);

// Parse JSON bodies
app.use(express.json());

// ─────────────────────────────────────────────────────────────
// DATABASE CONNECTION
// ─────────────────────────────────────────────────────────────

connectDB();

// ─────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────

// 🚀 SMART VERCEL COMPATIBILITY: Handles both raw paths and base API routing paths cleanly
app.use("/api/progress", progressRoutes);
app.use("/progress", progressRoutes); // Backup path mapping when Vercel rewrites target directories

// Health check endpoint
app.get("/api/health", (req, res) => {
  console.log("💚 GET /api/health - Server is healthy!");
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "not set",
  });
});

// ─────────────────────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log("");
  console.log("╔════════════════════════════════════════════╗");
  console.log("║  🚀 Server Started Successfully!          ║");
  console.log("╠════════════════════════════════════════════╣");
  console.log(`║  URL:  http://localhost:${PORT}                  ║`);
  console.log("║  API:  http://localhost:5000/api/progress ║");
  console.log("╚════════════════════════════════════════════╝");
  console.log("");
});

// ─────────────────────────────────────────────────────────────
// GRACEFUL SHUTDOWN
// ─────────────────────────────────────────────────────────────

process.on("SIGINT", () => {
  console.log("\n🛑 Server shutting down...");
  process.exit(0);
});

export default app; // 👈 NECESSARY FOR VERCEL SERVERLESS TRANSFERS
