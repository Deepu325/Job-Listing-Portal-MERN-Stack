import React, { useContext, useEffect, useState } from "react";
import { MapPin, Briefcase, Clock, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../card";
import { JobContext } from "../../../context/JobContext";
import api from "../../../utils/api";

const LatestJobs = () => {
    const { loading: contextLoading } = useContext(JobContext);
    const [latestJobs, setLatestJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestJobs = async () => {
            try {
                const res = await api.get('/api/v1/jobs?limit=6');
                setLatestJobs(res.data.jobs || []);
            } catch (error) {
                console.error("Failed to fetch latest jobs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatestJobs();
    }, []);

    if (loading || contextLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-green-700" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
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

            {latestJobs.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No jobs posted recently.</p>
                    <Link to="/jobs" className="text-green-700 font-bold mt-2 inline-block">Browse all anyway</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {latestJobs.map((job) => (
                        <Link
                            key={job._id}
                            to={`/description/${job._id}`}
                            className="group block"
                        >
                            <Card className="h-full hover:border-green-200 hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center text-green-700 font-bold text-sm">
                                            {(job.company?.name || job.company || 'J').charAt(0)}
                                        </div>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {job.location}
                                        </span>
                                    </div>

                                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">{job.company?.name || job.company}</p>

                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="h-3 w-3" />
                                            {job.jobType}
                                        </span>
                                        <span className="text-green-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                            {typeof job.salary === 'object'
                                                ? `${job.salary.min}-${job.salary.max}`
                                                : (job.salary || 'Competitive')}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

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
