import express from "express";
import { uploadResume } from "../controllers/resumeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Protected route
router.post("/", authMiddleware, upload.single("resume"), uploadResume);

export default router;
