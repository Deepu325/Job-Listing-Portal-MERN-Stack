 import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobSeekerRoutes from "./routes/jobSeekerRoutes.js";
import employerRoutes from "./routes/employerRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// Connect DB AFTER dotenv
await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/profile/jobseeker", jobSeekerRoutes);
app.use("/api/v1/profile/employer", employerRoutes);
app.use("/api/v1/profile/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "✅ Job Portal Backend server is running" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
