import express from "express";
import { getEmployerProfile, createOrUpdateEmployerProfile } from "../controllers/employerProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.get("/", getEmployerProfile);
router.post("/", createOrUpdateEmployerProfile);

export default router;
