import EmployerProfile from "../models/EmployerProfile.js";

// @desc    Get current employer profile
// @route   GET /api/v1/profile/employer
// @access  Private (Employer only)
export const getEmployerProfile = async (req, res) => {
    try {
        // Role check (Double check, though middleware should handle generalized auth, we need specific role check)
        // Assuming authMiddleware adds req.user = { userId, role }
        if (req.user.role !== "Employer") {
            return res.status(403).json({ message: "Access denied. Employers only." });
        }

        const profile = await EmployerProfile.findOne({ userId: req.user.userId }).populate("userId", "name email");

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error(`Get Employer Profile Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create or update employer profile
// @route   POST /api/v1/profile/employer
// @access  Private (Employer only)
export const createOrUpdateEmployerProfile = async (req, res) => {
    const { companyName, description, location, website } = req.body;

    if (req.user.role !== "Employer") {
        return res.status(403).json({ message: "Access denied. Employers only." });
    }

    // Build profile object
    const profileFields = {
        userId: req.user.userId,
        companyName,
        description,
        location,
        website
    };

    try {
        let profile = await EmployerProfile.findOne({ userId: req.user.userId });

        if (profile) {
            // Update
            profile = await EmployerProfile.findOneAndUpdate(
                { userId: req.user.userId },
                { $set: profileFields },
                { new: true }
            );
            return res.status(200).json(profile);
        }

        // Create
        profile = new EmployerProfile(profileFields);
        await profile.save();
        res.status(201).json(profile);

    } catch (error) {
        console.error(`Create Employer Profile Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};
