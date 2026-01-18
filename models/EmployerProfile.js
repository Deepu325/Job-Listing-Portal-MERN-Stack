import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        companyName: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        location: {
            type: String
        },
        website: {
            type: String
        },
        // Future: Jobs posted, etc.
    },
    {
        timestamps: true
    }
);

export default mongoose.model("EmployerProfile", employerProfileSchema);
