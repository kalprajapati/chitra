import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentSessionUser,
} from "../controllers/authController.js";

const router = express.Router();

// Authentication Endpoints
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", getCurrentSessionUser);

export default router;
