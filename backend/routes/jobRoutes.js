import express from "express";
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
} from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(protect, createJob)
    .get(getAllJobs);

router.route("/:id")
    .get(getJobById)
    .put(protect, updateJob)
    .delete(protect, deleteJob);

export default router;
