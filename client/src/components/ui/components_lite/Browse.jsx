import React, { useState, useEffect } from 'react';
import { Button } from '../button';
import { Search, MapPin, Briefcase, Building2 } from 'lucide-react';
import api from '../../../utils/api';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { JobContext } from '../../../context/JobContext';

// Dummy job data
const dummyJobs = [
    {
        _id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp India',
        location: 'Bangalore',
        jobType: 'Full-time',
        description: 'We are looking for an experienced frontend developer proficient in React, TypeScript, and modern CSS frameworks.',
        salary: '₹18-25 LPA',
    },
    {
        _id: '2',
        title: 'Backend Engineer',
        company: 'StartupHub',
        location: 'Mumbai',
        jobType: 'Full-time',
        description: 'Join our team to build scalable APIs using Node.js and MongoDB. Experience with microservices is a plus.',
        salary: '₹15-22 LPA',
    },
    {
        _id: '3',
        title: 'UI/UX Designer',
        company: 'DesignStudio',
        location: 'Delhi',
        jobType: 'Full-time',
        description: 'Create beautiful user experiences for web and mobile applications. Proficiency in Figma required.',
        salary: '₹12-18 LPA',
    },
    {
        _id: '4',
        title: 'Data Scientist',
        company: 'Analytics Pro',
        location: 'Hyderabad',
        jobType: 'Full-time',
        description: 'Analyze large datasets and build ML models. Python, TensorFlow, and SQL expertise needed.',
        salary: '₹20-30 LPA',
    },
    {
        _id: '5',
        title: 'DevOps Engineer',
        company: 'CloudNine',
        location: 'Pune',
        jobType: 'Remote',
        description: 'Manage cloud infrastructure on AWS/GCP. Experience with Docker, Kubernetes, and CI/CD pipelines.',
        salary: '₹16-24 LPA',
    },
    {
        _id: '6',
        title: 'Product Manager',
        company: 'InnovateTech',
        location: 'Bangalore',
        jobType: 'Full-time',
        description: 'Lead product development from ideation to launch. Strong analytical and communication skills required.',
        salary: '₹25-35 LPA',
    },
    {
        _id: '7',
        title: 'Mobile App Developer',
        company: 'AppWorks',
        location: 'Chennai',
        jobType: 'Full-time',
        description: 'Build cross-platform mobile apps using React Native or Flutter. 3+ years experience preferred.',
        salary: '₹14-20 LPA',
    },
    {
        _id: '8',
        title: 'Full Stack Developer',
        company: 'WebSolutions',
        location: 'Remote',
        jobType: 'Remote',
        description: 'Work on end-to-end web applications using MERN stack. Strong problem-solving skills needed.',
        salary: '₹12-18 LPA',
    },
];

const Browse = () => {
    const { jobs, loading } = useContext(JobContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = !locationFilter || job.location?.toLowerCase().includes(locationFilter.toLowerCase());
        return matchesSearch && matchesLocation;
    });

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse All Jobs</h1>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search jobs, companies, or keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <div className="relative w-full md:w-64">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Location"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {/* Results count */}
                <p className="text-gray-600 mb-4">
                    Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'}
                </p>

                {/* Job Listings */}
                {loading ? (
                    <div className="text-center py-10">Loading jobs...</div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No jobs found. Try adjusting your search criteria.
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredJobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
                                        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-3">
                                            <span className="flex items-center gap-1">
                                                <Building2 className="h-4 w-4" />
                                                {job.company || 'Company'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {job.location || 'Remote'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="h-4 w-4" />
                                                {job.jobType || 'Full-time'}
                                            </span>
                                            {job.salary && (
                                                <span className="text-green-700 font-medium">{job.salary}</span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 line-clamp-2">{job.description}</p>
                                    </div>
                                    <Link to={`/description/${job._id}`}>
                                        <Button className="bg-green-700 hover:bg-green-800 ml-4">
                                            View Details
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
