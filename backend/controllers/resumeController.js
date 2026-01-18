import JobSeekerProfile from "../models/JobSeekerProfile.js";
import path from "path";

// @desc    Upload Resume
// @route   POST /api/v1/profile/resume
// @access  Private (Job Seeker)
export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { userId } = req.user;
        const resumePath = req.file.path.replace(/\\/g, "/"); // Normalize path for Windows
        const originalName = req.file.originalname;

        // Find profile and update
        let profile = await JobSeekerProfile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: "Job Seeker Profile not found. Create profile first." });
        }

        profile.resume = resumePath;
        profile.resumeOriginalName = originalName;
        await profile.save();

        res.status(200).json({
            message: "Resume uploaded successfully",
            resume: resumePath,
            name: originalName
        });

    } catch (error) {
        console.error(`Resume Upload Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};
