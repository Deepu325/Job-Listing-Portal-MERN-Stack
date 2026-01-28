import express from "express";
import { getJobSeekerProfile, createOrUpdateJobSeekerProfile } from "../controllers/jobSeekerProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// All routes are protected and restricted to Job Seekers
router.use(authMiddleware);
router.use(authorize(["Job Seeker"]));

router.get("/", getJobSeekerProfile);
router.post("/", createOrUpdateJobSeekerProfile);

export default router;
