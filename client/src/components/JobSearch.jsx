import { useState } from "react";
import axios from "axios";

const JobSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/jobs",
        {
          params: {
            keyword,
            location,
          },
        }
      );
      setJobs(res.data);
    } catch (error) {
      console.error("Job search failed", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Search</h2>

      <input
        type="text"
        placeholder="Keyword (e.g. React)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: "20px" }}>
        {jobs.map((job) => (
          <div key={job._id}>
            <h4>{job.title}</h4>
            <p>{job.location}</p>
            <p>{job.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;
