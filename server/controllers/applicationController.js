import Application from "../models/Application.js";
import Job from "../models/Job.js";

// @desc    Apply for a job
// @route   POST /api/v1/jobs/:id/apply
// @access  Private (Job Seeker only)
export const applyJob = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const userId = req.user.userId;
        const userRole = req.user.role;

        // Check if user is a job seeker
        if (userRole !== "Job Seeker") {
            return res.status(403).json({ message: "Only job seekers can apply for jobs" });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if user is applying to their own job (if they are an employer, but role check handles this)

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
            status: "pending",
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

// @desc    Get applications for current user (Job Seeker)
// @route   GET /api/v1/applications/user
// @access  Private (Job Seeker only)
export const getUserApplications = async (req, res) => {
    try {
        const userId = req.user.userId;

        const applications = await Application.find({ applicant: userId })
            .populate({
                path: "job",
                select: "title company location status salary jobType"
            })
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching user applications:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get applications for an employer (all applications to their jobs)
// @route   GET /api/v1/applications/employer
// @access  Private (Employer only)
export const getEmployerApplications = async (req, res) => {
    try {
        const userId = req.user.userId;
        const userRole = req.user.role;

        if (userRole !== "Employer") {
            return res.status(403).json({ message: "Access denied. Employers only." });
        }

        // Find all jobs posted by this employer
        const jobs = await Job.find({ postedBy: userId }).select("_id");
        const jobIds = jobs.map(job => job._id);

        // Find applications for these jobs
        const applications = await Application.find({ job: { $in: jobIds } })
            .populate("applicant", "name email") // Populate applicant basic user info
            .populate("job", "title")
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching employer applications:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update application status
// @route   PUT /api/v1/applications/:id/status
// @access  Private (Employer only)
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const application = await Application.findById(id).populate("job");

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Check if the current user is the employer who posted the job
        if (application.job.postedBy.toString() !== req.user.userId.toString()) {
            return res.status(401).json({ message: "Not authorized to update this application" });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ message: "Status updated successfully", application });
    } catch (error) {
        console.error("Error updating application status:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
