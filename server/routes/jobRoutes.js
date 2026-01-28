import express from "express";
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    searchJobs,
    getEmployerJobs
} from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(protect, createJob)
    .get(getAllJobs);

router.get("/search", searchJobs);
router.get("/employer", protect, getEmployerJobs);

router.route("/:id")
    .get(getJobById)
    .put(protect, updateJob)
    .delete(protect, deleteJob);

export default router;
