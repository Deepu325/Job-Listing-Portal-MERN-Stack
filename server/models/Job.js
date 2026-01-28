import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a job title"],
        trim: true,
        maxlength: [100, "Job title cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Please provide a job description"]
    },
    company: {
        // Snapshot of company details to avoid extra lookups
        name: {
            type: String,
            required: true
        },
        logo: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EmployerProfile'
        }
    },
    location: {
        type: String,
        required: [true, "Please provide a job location"],
        trim: true
    },
    salary: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: "USD"
        }
    },
    jobType: {
        type: String,
        required: [true, "Please provide a job type"],
        enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance", "Remote"]
    },
    skills: [{
        type: String,
        trim: true
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["active", "closed", "expired"],
        default: "active"
    }
}, { timestamps: true });

// Add index for search
jobSchema.index({ title: 'text', description: 'text', 'skills': 'text' });

const Job = mongoose.model("Job", jobSchema);

export default Job;
