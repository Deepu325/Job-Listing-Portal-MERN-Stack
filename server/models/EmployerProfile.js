import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  companyDescription: {
    type: String,
    trim: true
  },
  companyEmail: {
    type: String,
    required: true,
    trim: true,
    match: [
       /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const EmployerProfile = mongoose.model("EmployerProfile", employerProfileSchema);

export default EmployerProfile;
