import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use("/api/progress", progressRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  console.log("💚 GET /api/health - Server is healthy!");
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
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
  console.log(`║  URL:  http://localhost:${PORT}`);
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
