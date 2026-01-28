import EmployerProfile from "../models/EmployerProfile.js";
import Job from "../models/Job.js";

// @desc    Get current employer profile
// @route   GET /api/v1/profile/employer
// @access  Private (Employer only)
export const getEmployerProfile = async (req, res) => {
    try {
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
    const {
        companyName,
        companyDescription,
        companyEmail,
        contactPhone,
        location,
        website,
        industry,
        logo
    } = req.body;

    // Build profile object
    const profileFields = {
        userId: req.user.userId,
        companyName,
        companyDescription,
        companyEmail,
        contactPhone,
        location,
        website,
        industry,
        logo
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

            // Update all jobs posted by this employer with new company info
            await Job.updateMany(
                { postedBy: req.user.userId },
                {
                    $set: {
                        "company.name": companyName,
                        "company.logo": logo
                    }
                }
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
