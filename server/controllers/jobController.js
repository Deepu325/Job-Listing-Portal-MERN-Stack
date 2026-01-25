import Job from "../models/Job.js";

/**
 * @desc    Search & filter jobs
 * @route   GET /api/jobs/search
 * @access  Public
 */
export const searchJobs = async (req, res) => {
  try {
    const { keyword, location, jobType } = req.query;

    let query = {};

    // 🔍 Keyword search (title OR skills)
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { skills: { $regex: keyword, $options: "i" } },
      ];
    }

    // 📍 Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // 🧑‍💼 Job type filter
    if (jobType) {
      query.jobType = jobType;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while searching jobs",
    });
  }
};
