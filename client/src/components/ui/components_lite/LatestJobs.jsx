import React from "react";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../card";

// Sample job data for display
const sampleJobs = [
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Bangalore", type: "Full-time", salary: "₹12-18 LPA" },
    { id: 2, title: "UX Designer", company: "DesignHub", location: "Mumbai", type: "Remote", salary: "₹10-15 LPA" },
    { id: 3, title: "Backend Engineer", company: "CloudTech", location: "Hyderabad", type: "Full-time", salary: "₹15-22 LPA" },
    { id: 4, title: "Product Manager", company: "StartupX", location: "Delhi", type: "Full-time", salary: "₹20-30 LPA" },
    { id: 5, title: "Data Analyst", company: "DataPro", location: "Pune", type: "Hybrid", salary: "₹8-12 LPA" },
    { id: 6, title: "DevOps Engineer", company: "InfraCo", location: "Remote", type: "Remote", salary: "₹14-20 LPA" },
];

const LatestJobs = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Latest Openings
                    </h2>
                    <p className="text-gray-500 mt-1">Explore fresh opportunities</p>
                </div>
                <Link
                    to="/jobs"
                    className="hidden sm:flex items-center gap-1 text-green-700 hover:text-green-800 font-medium transition-colors"
                >
                    View all jobs
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            {/* Job Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sampleJobs.map((job) => (
                    <Link
                        key={job.id}
                        to={`/description/${job.id}`}
                        className="group block"
                    >
                        <Card className="h-full hover:border-green-200 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-5">
                                {/* Company & Location */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center text-green-700 font-bold text-sm">
                                        {job.company.charAt(0)}
                                    </div>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {job.location}
                                    </span>
                                </div>

                                {/* Job Title & Company */}
                                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                                    {job.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">{job.company}</p>

                                {/* Tags */}
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="h-3 w-3" />
                                        {job.type}
                                    </span>
                                    <span className="text-green-700 font-medium">{job.salary}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Mobile View All Link */}
            <div className="mt-8 text-center sm:hidden">
                <Link
                    to="/jobs"
                    className="inline-flex items-center gap-1 text-green-700 hover:text-green-800 font-medium"
                >
                    View all jobs
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
};

export default LatestJobs;
