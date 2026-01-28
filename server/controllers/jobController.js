import Job from "../models/Job.js";
import EmployerProfile from "../models/EmployerProfile.js";
import User from "../models/User.js";

// @desc    Create a new job
// @route   POST /api/v1/jobs
// @access  Private (Employer only)
export const createJob = async (req, res) => {
    try {
        const { title, description, location, salary, jobType, skills } = req.body;

        // Check if user is an employer
        if (req.user.role !== 'Employer') {
            return res.status(403).json({ message: "Only employers can post jobs" });
        }

        // Get employer profile to populate company details
        const employerProfile = await EmployerProfile.findOne({ userId: req.user.userId });

        if (!employerProfile) {
            return res.status(404).json({ message: "Employer profile not found. Please complete your profile first." });
        }

        const job = new Job({
            title,
            description,
            location,
            salary,
            jobType,
            skills,
            company: {
                name: employerProfile.companyName,
                logo: employerProfile.logo,
                id: employerProfile._id
            },
            postedBy: req.user.userId
        });

        const savedJob = await job.save();
        res.status(201).json(savedJob);

    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get all jobs
// @route   GET /api/v1/jobs
// @access  Public
export const getAllJobs = async (req, res) => {
    try {
        const { keyword, location, jobType, page = 1, limit = 10 } = req.query;

        const query = { status: 'active' };

        if (keyword) {
            // Check if text index is used, or fallback to regex
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { skills: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (jobType && jobType !== 'All') {
            query.jobType = jobType;
        }

        const jobs = await Job.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('postedBy', 'name email');

        const count = await Job.countDocuments(query);

        res.status(200).json({
            jobs,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            totalJobs: count
        });
    } catch (error) {
        console.error("Error getting jobs:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Search jobs
// @route   GET /api/v1/jobs/search
// @access  Public
export const searchJobs = async (req, res) => {
    try {
        const { keyword, location, jobType } = req.query;

        let query = { status: 'active' };

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { skills: { $regex: keyword, $options: "i" } },
            ];
        }

        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        if (jobType && jobType !== 'All') {
            query.jobType = jobType;
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 }).populate('postedBy', 'name email');

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs,
        });
    } catch (error) {
        console.error("Error searching jobs:", error);
        res.status(500).json({
            success: false,
            message: "Server error while searching jobs",
        });
    }
};

// @desc    Get jobs posted by the authenticated employer
// @route   GET /api/v1/jobs/employer
// @access  Private (Employer only)
export const getEmployerJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error getting employer jobs:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get job by ID
// @route   GET /api/v1/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name email');

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error("Error getting job:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update job
// @route   PUT /api/v1/jobs/:id
// @access  Private (Owner only)
export const updateJob = async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check ownership
        if (job.postedBy.toString() !== req.user.userId.toString()) {
            return res.status(401).json({ message: "Not authorized to update this job" });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(job);
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /api/v1/jobs/:id
// @access  Private (Owner only)
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check ownership
        if (job.postedBy.toString() !== req.user.userId.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this job" });
        }

        await job.deleteOne();

        res.status(200).json({ message: "Job removed" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
