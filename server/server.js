import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
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
app.use("/api/v1/profile/jobseeker", jobSeekerRoutes);
app.use("/api/v1/profile/employer", employerRoutes);
app.use("/api/v1/profile/resume", resumeRoutes);

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
