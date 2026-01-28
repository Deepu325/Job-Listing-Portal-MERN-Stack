import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../button';
import { Search, MapPin, Briefcase, Building2, DollarSign, Bookmark, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { JobContext } from '../../../context/JobContext';
import { Badge } from '../badge';
import { Card, CardContent, CardFooter } from '../card';

const Jobs = () => {
    const { isAuth } = useContext(AuthContext);
    const { jobs, loading, fetchJobs } = useContext(JobContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Technology', 'Marketing', 'Design', 'Sales', 'Engineering', 'Finance'];

    const handleSearch = () => {
        const params = {};
        if (searchTerm) params.keyword = searchTerm;
        if (selectedCategory !== 'All') params.jobType = selectedCategory;
        fetchJobs(params);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        const params = {};
        if (searchTerm) params.keyword = searchTerm;
        if (category !== 'All') params.jobType = category;
        fetchJobs(params);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-3xl p-10 mb-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Future</h1>
                        <p className="text-green-100 mb-8 text-lg max-w-xl">Find the best opportunities from top companies and take the next step in your career journey.</p>

                        <div className="flex bg-white rounded-2xl p-2 shadow-inner-xl max-w-2xl border border-white/20 backdrop-blur-sm">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search by title, skills or company..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full pl-12 pr-4 py-3 text-gray-900 outline-none rounded-xl"
                                />
                            </div>
                            <Button
                                onClick={handleSearch}
                                className="bg-green-700 hover:bg-green-800 ml-2 px-8 rounded-xl shadow-lg font-bold"
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                    {/* Abstract background elements */}
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
                </div>

                {/* Filters Section */}
                <div className="mb-10 space-y-4">
                    <h3 className="text-gray-900 font-bold text-lg mb-4">Browse by Category</h3>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-6 py-2.5 rounded-2xl font-bold transition-all border ${selectedCategory === category
                                    ? 'bg-green-700 text-white border-green-700 shadow-lg'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-700 hover:text-green-700'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-500 font-medium">
                        Showing <span className="text-gray-900 font-bold">{jobs.length}</span> available positions
                    </p>
                </div>

                {/* Job Cards */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-green-700 mb-4" />
                        <p className="text-gray-500 font-medium">Fetching opportunities...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Jobs Found</h3>
                        <p className="text-gray-500">We couldn't find any jobs matching your criteria. Try adjusting your filters.</p>
                        <Button
                            variant="link"
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); fetchJobs(); }}
                            className="text-green-700 font-bold mt-2"
                        >
                            Clear all filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job) => (
                            <Card
                                key={job._id}
                                className="group bg-white border-0 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden"
                            >
                                <CardContent className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100 group-hover:bg-green-700 group-hover:border-green-700 transition-colors">
                                            <Building2 className="h-7 w-7 text-green-700 group-hover:text-white transition-colors" />
                                        </div>
                                        <button className="p-2 text-gray-300 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all">
                                            <Bookmark className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{job.title}</h2>
                                    <p className="text-gray-500 font-medium mb-6 flex items-center gap-2">
                                        {job.company?.name || job.company || 'ScaleUp Inc.'}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <Badge variant="secondary" className="bg-gray-50 text-gray-600 border-0 px-3 py-1 font-bold rounded-lg capitalize">
                                            <MapPin className="h-3 w-3 mr-1.5" />
                                            {job.location}
                                        </Badge>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-0 px-3 py-1 font-bold rounded-lg">
                                            <Briefcase className="h-3 w-3 mr-1.5" />
                                            {job.jobType}
                                        </Badge>
                                    </div>

                                    <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                        <div className="flex items-center text-green-700 font-bold">
                                            <DollarSign className="h-4 w-4" />
                                            {typeof job.salary === 'object'
                                                ? `${job.salary.min}-${job.salary.max}`
                                                : (job.salary || 'Competitive')}
                                        </div>
                                        <Link to={isAuth ? `/description/${job._id}` : '/login'}>
                                            <Button variant="ghost" className="text-green-700 font-bold hover:bg-green-50 gap-1 rounded-xl">
                                                Details <ExternalLink className="h-3.5 w-3.5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ExternalLink = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
);

export default Jobs;
