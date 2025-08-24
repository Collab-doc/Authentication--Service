import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());

// Allow multiple origins via env var (comma-separated), fallback to localhost for dev
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());

// Simple health check
app.get("/", (req, res) => {
  res.send("OK");
});

// Routes
app.use("/api/auth", authRoutes); // any request to /api/auth/... is forwarded to authRoutes.js

// Sync Database
try {
  await sequelize.sync({ force: false });
  console.log("Database synced");
} catch (error) {
  console.error("Database sync error:", error);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));