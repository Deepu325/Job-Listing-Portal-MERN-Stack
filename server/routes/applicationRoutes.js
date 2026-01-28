import express from "express";
import {
    applyJob,
    getUserApplications,
    getEmployerApplications,
    updateApplicationStatus
} from "../controllers/applicationController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Application routes
router.post("/apply/:id", protect, applyJob);
router.get("/user", protect, getUserApplications);
router.get("/employer", protect, getEmployerApplications);
router.put("/:id/status", protect, updateApplicationStatus);

export default router;
