import express from "express";
import { getEmployerProfile, updateEmployerProfile } from "../controllers/employerProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/employer", authMiddleware, getEmployerProfile);
router.put("/employer", authMiddleware, updateEmployerProfile);

export default router;
