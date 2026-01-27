import Application from "../models/Application.js";
import Job from "../models/Job.js";

// Apply for a job
export const applyJob = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const userId = req.user.userId;
        const userRole = req.user.role;

        // Check if user is a job seeker
        if (userRole !== "Job Seeker") {
            return res.status(403).json({ message: "Only job seekers can apply for jobs" });
        }

        // Check if job exists (Only if Job model is available and working)
        // We assume Job model is working.
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if duplicate application
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        // Create application
        const application = await Application.create({
            job: jobId,
            applicant: userId,
            status: "pending", // Default status
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application,
        });
    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get applications for a user (Job Seeker)
export const getUserApplications = async (req, res) => {
    try {
        const userId = req.user.userId;

        const applications = await Application.find({ applicant: userId })
            .populate("job", "title company location status") // Populate job details
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching user applications:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get applications for an employer
export const getEmployerApplications = async (req, res) => {
    try {
        const userId = req.user.userId;
        const userRole = req.user.role;

        if (userRole !== "Employer") {
            return res.status(403).json({ message: "Access denied. Employers only." });
        }

        // Find all jobs posted by this employer
        // Assuming 'postedBy' is the field for the employer ID in Job model
        const jobs = await Job.find({ postedBy: userId }).select("_id");
        const jobIds = jobs.map(job => job._id);

        // Find applications for these jobs
        const applications = await Application.find({ job: { $in: jobIds } })
            .populate("applicant", "name email phone resume") // Populate applicant details
            .populate("job", "title")
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching employer applications:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
