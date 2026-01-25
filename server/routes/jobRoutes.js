import express from "express";
import { searchJobs } from "../controllers/jobController.js";

const router = express.Router();

// 🔍 Job search & filters
router.get("/search", searchJobs);

export default router;
