import EmployerProfile from "../models/EmployerProfile.js";
import User from "../../models/User.js";

// @desc    Get current employer profile
// @route   GET /api/profile/employer
// @access  Private (Employer only)
export const getEmployerProfile = async (req, res) => {
    try {
        // 1. Check if user is an Employer
        if (req.user.role !== "Employer") {
            return res.status(403).json({ message: "Access denied. Employer account required." });
        }

        // 2. Find profile
        const profile = await EmployerProfile.findOne({ userId: req.user.userId });

        if (!profile) {
            return res.status(404).json({ message: "Employer profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error(`GetProfile error: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Create or update employer profile
// @route   PUT /api/profile/employer
// @access  Private (Employer only)
export const updateEmployerProfile = async (req, res) => {
    try {
        // 1. Check if user is an Employer
        if (req.user.role !== "Employer") {
            return res.status(403).json({ message: "Access denied. Employer account required." });
        }

        const { companyName, companyDescription, companyEmail, phone, location } = req.body;

        // 2. Build profile object
        const profileFields = {
            userId: req.user.userId,
            companyName,
            companyDescription,
            companyEmail,
            phone,
            location
        };

        // 3. Upsert profile (Create if valid, Update if exists)
        // Using findOneAndUpdate with upsert: true
        const profile = await EmployerProfile.findOneAndUpdate(
            { userId: req.user.userId },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
        );

        res.status(200).json({
            message: "Employer profile updated successfully",
            profile
        });

    } catch (error) {
        console.error(`UpdateProfile error: ${error.message}`);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Server error" });
    }
};
