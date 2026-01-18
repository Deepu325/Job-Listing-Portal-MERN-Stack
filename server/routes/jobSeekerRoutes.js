import express from "express";
import { getJobSeekerProfile, createOrUpdateJobSeekerProfile } from "../controllers/jobSeekerProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.get("/", getJobSeekerProfile);
router.post("/", createOrUpdateJobSeekerProfile);

export default router;
