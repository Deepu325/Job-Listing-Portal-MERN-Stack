import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./server/routes/authRoutes.js";

dotenv.config();        // Load environment variables
connectDB();            // Connect MongoDB Atlas

const app = express();

// Middleware
app.use(cors());           // Enable CORS
app.use(express.json());  // Middleware to read JSON data from requests

// API Routes
app.use("/api/auth", authRoutes);
import jobSeekerRoutes from "./server/routes/jobSeekerRoutes.js";
app.use("/api/v1/profile/jobseeker", jobSeekerRoutes);

// Test route (health check)
app.get("/", (req, res) => {
  res.status(200).json({ message: "Job Portal Backend server is running" });
});

// Port configuration
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
