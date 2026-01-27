import React, { useState, useEffect, useContext } from "react";
import { Button } from "../button";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  DollarSign,
  Bookmark,
} from "lucide-react";
import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { JobContext } from "../../../context/JobContext";
import { Badge } from "../badge";
import { Card, CardContent, CardFooter } from "../card";

// Dummy job data with categories
const dummyJobs = [
  {
    _id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp India",
    location: "Bangalore",
    jobType: "Full-time",
    category: "Technology",
    description:
      "We are looking for an experienced frontend developer proficient in React, TypeScript, and modern CSS frameworks.",
    salary: "₹18-25 LPA",
  },
  {
    _id: "2",
    title: "Backend Engineer",
    company: "StartupHub",
    location: "Mumbai",
    jobType: "Full-time",
    category: "Engineering",
    description:
      "Join our team to build scalable APIs using Node.js and MongoDB.",
    salary: "₹15-22 LPA",
  },
  {
    _id: "3",
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Delhi",
    jobType: "Full-time",
    category: "Design",
    description:
      "Create beautiful user experiences for web and mobile applications.",
    salary: "₹12-18 LPA",
  },
  {
    _id: "4",
    title: "Digital Marketing Manager",
    company: "GrowthHackers",
    location: "Hyderabad",
    jobType: "Full-time",
    category: "Marketing",
    description:
      "Lead our digital marketing initiatives including SEO, SEM, and social media.",
    salary: "₹14-20 LPA",
  },
  {
    _id: "5",
    title: "Sales Executive",
    company: "SalesForce Pro",
    location: "Pune",
    jobType: "Full-time",
    category: "Sales",
    description:
      "Drive B2B sales and build client relationships. Excellent communication skills required.",
    salary: "₹8-15 LPA + Commission",
  },
  {
    _id: "6",
    title: "Financial Analyst",
    company: "FinanceFirst",
    location: "Mumbai",
    jobType: "Full-time",
    category: "Finance",
    description:
      "Analyze financial data and create reports for business decisions. CFA preferred.",
    salary: "₹12-18 LPA",
  },
  {
    _id: "7",
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "Remote",
    jobType: "Remote",
    category: "Technology",
    description: "Work on end-to-end web applications using MERN stack.",
    salary: "₹12-18 LPA",
  },
  {
    _id: "8",
    title: "Content Marketing Specialist",
    company: "ContentKing",
    location: "Bangalore",
    jobType: "Full-time",
    category: "Marketing",
    description:
      "Create compelling content for blogs, social media, and email campaigns.",
    salary: "₹8-12 LPA",
  },
  {
    _id: "9",
    title: "Mechanical Engineer",
    company: "EngineerWorks",
    location: "Chennai",
    jobType: "Full-time",
    category: "Engineering",
    description:
      "Design and develop mechanical systems. CAD/CAM experience required.",
    salary: "₹10-16 LPA",
  },
  {
    _id: "10",
    title: "Graphic Designer",
    company: "CreativeAgency",
    location: "Delhi",
    jobType: "Full-time",
    category: "Design",
    description:
      "Create visual content for marketing materials, websites, and social media.",
    salary: "₹6-10 LPA",
  },
  {
    _id: "11",
    title: "Data Analyst",
    company: "DataDriven",
    location: "Hyderabad",
    jobType: "Full-time",
    category: "Technology",
    description:
      "Analyze data sets to provide business insights. SQL and Python required.",
    salary: "₹10-15 LPA",
  },
  {
    _id: "12",
    title: "Account Manager",
    company: "ClientFirst",
    location: "Mumbai",
    jobType: "Full-time",
    category: "Sales",
    description: "Manage key client accounts and ensure customer satisfaction.",
    salary: "₹12-18 LPA",
  },
];

// ...

const Jobs = () => {
  const { isAuth } = useContext(AuthContext);
  const { jobs, loading } = useContext(JobContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Marketing",
    "Design",
    "Sales",
    "Engineering",
    "Finance",
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      job.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Job</h1>
          <p className="text-green-100 mb-6">
            Discover opportunities that match your skills and career goals
          </p>

          <div className="flex bg-white rounded-lg p-2 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-gray-900 outline-none"
              />
            </div>
            <Button className="bg-green-700 hover:bg-green-800 ml-2">
              Search Jobs
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredJobs.length}
            </span>{" "}
            jobs found
          </p>
        </div>

        {/* Job Cards */}
        {loading ? (
          <div className="text-center py-10">Loading jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No jobs found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card
                key={job._id}
                className="hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-green-700" />
                    </div>
                    <button className="text-gray-400 hover:text-green-700">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {job.company || "Company"}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location || "Remote"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      <Briefcase className="h-3 w-3 mr-1" />
                      {job.jobType || "Full-time"}
                    </Badge>
                  </div>

                  {job.salary && (
                    <p className="text-green-700 font-semibold mb-4 flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link
                    to={isAuth ? `/description/${job._id}` : "/login"}
                    className="w-full"
                  >
                    <Button className="w-full bg-green-700 hover:bg-green-800">
                      {isAuth ? "Apply Now" : "Login to Apply"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
