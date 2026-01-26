import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import jobSeekerRoutes from "./routes/jobSeekerRoutes.js";
import employerRoutes from "./routes/employerRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();        // Load environment variables
connectDB();            // Connect MongoDB Atlas

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());  // Middleware to read JSON data from requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/profile/jobseeker", jobSeekerRoutes);
app.use("/api/v1/profile/employer", employerRoutes);
app.use("/api/v1/profile/resume", resumeRoutes);

// Test route (health check)
app.get("/", (req, res) => {
  res.status(200).json({ message: "Job Portal Backend server is running" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  try {
    fs.appendFileSync("error.log", `${new Date().toISOString()} - ${err.stack}\n`);
  } catch (e) {
    console.error("Failed to write to error log", e);
  }
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Port configuration
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
