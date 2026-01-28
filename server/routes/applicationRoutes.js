import express from "express";
import {
    applyJob,
    getUserApplications,
    getEmployerApplications,
    updateApplicationStatus
} from "../controllers/applicationController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Application routes
router.post("/apply/:id", protect, authorize("Job Seeker"), applyJob);
router.get("/user", protect, authorize("Job Seeker"), getUserApplications);
router.get("/employer", protect, authorize("Employer"), getEmployerApplications);
router.put("/:id/status", protect, authorize("Employer"), updateApplicationStatus);

export default router;
