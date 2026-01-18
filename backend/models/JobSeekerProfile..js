import mongoose from "mongoose";

const jobSeekerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    fullName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String
    },

    skills: {
      type: [String]
    },

    education: {
      type: String
    },

    experience: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("JobSeekerProfile", jobSeekerProfileSchema);
