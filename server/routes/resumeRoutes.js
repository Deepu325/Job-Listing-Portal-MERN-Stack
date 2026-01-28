import express from "express";
import { uploadResume, uploadProfilePicture } from "../controllers/resumeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload, { imageUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, upload.single("resume"), uploadResume);
router.post("/picture", authMiddleware, imageUpload.single("profilePicture"), uploadProfilePicture);

export default router;

