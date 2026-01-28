import express from "express";
import { getEmployerProfile, createOrUpdateEmployerProfile } from "../controllers/employerProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// All routes are protected and restricted to Employers
router.use(authMiddleware);
router.use(authorize(["Employer"]));

router.get("/", getEmployerProfile);
router.post("/", createOrUpdateEmployerProfile);

export default router;
