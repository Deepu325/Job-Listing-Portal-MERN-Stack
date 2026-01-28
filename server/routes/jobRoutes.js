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
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.route("/")
    .post(protect, authorize("Employer"), createJob)
    .get(getAllJobs);

router.get("/search", searchJobs);
router.get("/employer", protect, authorize("Employer"), getEmployerJobs);

router.route("/:id")
    .get(getJobById)
    .put(protect, authorize("Employer"), updateJob)
    .delete(protect, authorize("Employer"), deleteJob);

export default router;
