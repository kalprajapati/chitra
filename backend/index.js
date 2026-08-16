import express from "express";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import cors from "cors";
import dotenv from "dotenv";
import env from "./src/config/env.js";
import sequelize, { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

// Register models
import "./src/models/User.js";

dotenv.config();

const app = express();
const port = env.PORT || 3000;

// Initialize Sequelize Session Store
const SequelizeStore = connectSessionSequelize(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
});

// Configure CORS for credentials support
app.use(
  cors({
    origin: env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Session Middleware
app.use(
  session({
    name: "sid",
    secret: env.SESSION_SECRET || "chitra_session_secret_super_secure_key_2026",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Sync Session Store Table
sessionStore.sync();

// API Routes
app.use("/api/auth", authRoutes);

// Base health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Chitra E-Commerce Backend API is running smoothly.",
  });
});

// Start Database connection and Server
connectDB()
  .then(async () => {
    await sequelize.sync();
    console.log("✅ Database synced successfully.");
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Server failed to start:", err);
  });