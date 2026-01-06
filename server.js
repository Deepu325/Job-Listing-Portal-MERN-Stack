import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();        // Load environment variables
connectDB();            // Connect MongoDB Atlas

const app = express();

// Middleware to read JSON data from requests
app.use(express.json());

// Test route (health check)
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Port configuration
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
