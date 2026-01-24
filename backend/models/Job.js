import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        default: "active",
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
    },
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;
