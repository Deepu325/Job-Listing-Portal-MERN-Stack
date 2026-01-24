import express from "express";
import { applyJob, getUserApplications, getEmployerApplications } from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route: POST /api/jobs/:id/apply
router.post("/jobs/:id/apply", authMiddleware, applyJob);

// Route: GET /api/applications/user
router.get("/applications/user", authMiddleware, getUserApplications);

// Route: GET /api/applications/employer
router.get("/applications/employer", authMiddleware, getEmployerApplications);

export default router;
