import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../button';
import { Search, MapPin, Briefcase, Building2, Loader2, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobContext } from '../../../context/JobContext';
import { AuthContext } from '../../../context/AuthContext';

const Browse = () => {
    const { user } = useContext(AuthContext);
    const { jobs, loading, fetchJobs } = useContext(JobContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    const handleSearch = () => {
        const params = {};
        if (searchTerm) params.keyword = searchTerm;
        if (locationFilter) params.location = locationFilter;
        fetchJobs(params);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Browse Opportunities</h1>
                        <p className="text-gray-500 text-lg">Explore thousands of career paths tailored to your expertise.</p>
                    </div>
                    {user?.role === 'Employer' && (
                        <Link to="/create-job" className="shrink-0">
                            <Button className="w-full md:w-auto bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105">
                                <Plus className="h-5 w-5" /> Post a Job
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Search and Filters Bar */}
                <div className="flex flex-col lg:flex-row gap-4 mb-10 bg-white p-4 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Role or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-green-600 outline-none font-medium transition-all"
                        />
                    </div>
                    <div className="relative group w-full lg:w-72">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Location..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-green-600 outline-none font-medium transition-all"
                        />
                    </div>
                    <Button
                        onClick={handleSearch}
                        className="lg:px-10 py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-2xl shadow-lg shadow-green-200 transition-all hover:scale-[1.02]"
                    >
                        Find Jobs
                    </Button>
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-6 px-2">
                    <p className="text-gray-500 font-medium">
                        Found <span className="text-gray-900 font-bold">{jobs.length}</span> matching positions
                    </p>
                    <Button variant="ghost" onClick={() => { setSearchTerm(''); setLocationFilter(''); fetchJobs(); }} className="text-green-700 font-bold hover:bg-green-50 rounded-xl">
                        Reset Filters
                    </Button>
                </div>

                {/* Job Listings List */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="h-12 w-12 animate-spin text-green-700 mb-4" />
                        <p className="text-gray-500 font-bold">Searching the database...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="h-10 w-10 text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching jobs</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">Try broadening your search criteria or check back later for new openings.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="group bg-white border border-transparent hover:border-green-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center border border-green-50 group-hover:bg-green-700 group-hover:text-white transition-colors">
                                                <Building2 className="h-8 w-8" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-800 transition-colors leading-tight">{job.title}</h2>
                                                <p className="text-green-700 font-bold flex items-center gap-1.5 mt-1">
                                                    {job.company?.name || job.company || 'Innovate Hub'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-6 text-gray-500 font-medium">
                                            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                                <MapPin className="h-4 w-4 text-green-600" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                                <Briefcase className="h-4 w-4 text-blue-600" />
                                                {job.jobType}
                                            </span>
                                            <span className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1.5 rounded-xl border border-green-100 font-bold">
                                                {typeof job.salary === 'object'
                                                    ? `${job.salary.min}-${job.salary.max} ${job.salary.currency}`
                                                    : (job.salary || 'Competitive Pay')}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 leading-relaxed line-clamp-2 max-w-3xl">{job.description}</p>
                                    </div>
                                    <Link to={`/description/${job._id}`} className="shrink-0 w-full md:w-auto">
                                        <Button className="w-full md:w-auto px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-2xl transition-transform group-hover:translate-x-1 flex items-center gap-2">
                                            View Details <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;
