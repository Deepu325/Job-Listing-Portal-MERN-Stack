import JobSeekerProfile from "../../models/JobSeekerProfile.js";
import User from "../../models/user.js";

// @desc    Get current job seeker profile
// @route   GET /api/v1/profile/jobseeker
// @access  Private (Job Seeker only)
export const getJobSeekerProfile = async (req, res) => {
    try {
        const profile = await JobSeekerProfile.findOne({ userId: req.user.userId }).populate("userId", "name email");

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error(`Get Profile Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create or update job seeker profile
// @route   POST /api/v1/profile/jobseeker
// @access  Private (Job Seeker only)
export const createOrUpdateJobSeekerProfile = async (req, res) => {
    const { fullName, email, phone, skills, education, experience } = req.body;

    // Build profile object
    const profileFields = {
        userId: req.user.userId,
        fullName,
        email,
        phone,
        skills: Array.isArray(skills) ? skills : skills.split(",").map((skill) => skill.trim()),
        education,
        experience
    };

    try {
        // Check if user exists (redundant if middleware works, but good for safety)
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        let profile = await JobSeekerProfile.findOne({ userId: req.user.userId });

        if (profile) {
            // Update
            profile = await JobSeekerProfile.findOneAndUpdate(
                { userId: req.user.userId },
                { $set: profileFields },
                { new: true }
            );
            return res.status(200).json(profile);
        }

        // Create
        profile = new JobSeekerProfile(profileFields);
        await profile.save();
        res.status(201).json(profile);

    } catch (error) {
        console.error(`Create Profile Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};
