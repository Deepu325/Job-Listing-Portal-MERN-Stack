import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { Badge } from '../badge';
import { Button } from '../button';
import { Plus, Users, Briefcase, ExternalLink, Loader2 } from 'lucide-react';
import api from '../../../utils/api';
import { toast } from 'sonner';

const EmployerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('jobs');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [jobsRes, appsRes] = await Promise.all([
                    api.get('/api/v1/jobs/employer'),
                    api.get('/api/v1/applications/employer')
                ]);
                setJobs(jobsRes.data);
                setApplications(appsRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            await api.put(`/api/v1/applications/${appId}/status`, { status: newStatus });
            setApplications(prev => prev.map(app =>
                app._id === appId ? { ...app, status: newStatus } : app
            ));
            toast.success(`Application marked as ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job? This will also remove all associated applications.")) return;
        try {
            await api.delete(`/api/v1/jobs/${jobId}`);
            setJobs(prev => prev.filter(job => job._id !== jobId));
            toast.success("Job deleted successfully");
        } catch (error) {
            toast.error("Failed to delete job");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 animate-spin text-green-700 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="bg-green-100 p-4 rounded-xl text-green-700">
                        <Briefcase className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Total Jobs Posted</p>
                        <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="bg-blue-100 p-4 rounded-xl text-blue-700">
                        <Users className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Total Applications</p>
                        <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
                    </div>
                </div>
            </div>

            {/* Post a Job Button */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
                <Button
                    onClick={() => window.location.href = '/create-job'}
                    className="bg-green-700 hover:bg-green-800 shadow-lg flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Post a Job
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'jobs' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    My Jobs
                </button>
                <button
                    onClick={() => setActiveTab('applications')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'applications' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Received Applications
                </button>
            </div>

            {/* Tables */}
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                {activeTab === 'jobs' ? (
                    <Table>
                        <TableCaption className="pb-4 text-gray-400">Manage your job listings</TableCaption>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="font-bold">Title</TableHead>
                                <TableHead className="font-bold">Date Posted</TableHead>
                                <TableHead className="font-bold text-center">Type</TableHead>
                                <TableHead className="text-right font-bold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-20">
                                        <div className="max-w-xs mx-auto">
                                            <p className="text-gray-400 italic mb-4">You haven't posted any jobs yet.</p>
                                            <Link to="/create-job">
                                                <Button className="bg-green-700 hover:bg-green-800 rounded-xl px-8">
                                                    <Plus className="mr-2 h-4 w-4" /> Post Your First Job
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                jobs.map((job) => (
                                    <TableRow key={job._id}>
                                        <TableCell className="font-semibold text-gray-900">{job.title}</TableCell>
                                        <TableCell className="text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-0">{job.jobType}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link to={`/description/${job._id}`}>
                                                <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50">View</Button>
                                            </Link>
                                            <Link to={`/edit-job/${job._id}`}>
                                                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit</Button>
                                            </Link>
                                            <Button
                                                onClick={() => handleDeleteJob(job._id)}
                                                variant="ghost"
                                                className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                ) : (
                    <Table>
                        <TableCaption className="pb-4 text-gray-400">Review candidate applications</TableCaption>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="font-bold">Candidate</TableHead>
                                <TableHead className="font-bold">Job Applied</TableHead>
                                <TableHead className="font-bold">Status</TableHead>
                                <TableHead className="text-right font-bold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-20 text-gray-400 italic">
                                        No applications received yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                applications.map((app) => (
                                    <TableRow key={app._id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900">{app.applicant?.name || 'Deleted User'}</span>
                                                <span className="text-xs text-gray-500">{app.applicant?.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600 font-medium">{app.job?.title || 'Job Deleted'}</TableCell>
                                        <TableCell>
                                            <Badge className={`
                                                ${app.status === 'rejected' ? 'bg-red-500 hover:bg-red-600' :
                                                    app.status === 'accepted' ? 'bg-green-600 hover:bg-green-700' :
                                                        app.status === 'shortlisted' ? 'bg-blue-600 hover:bg-blue-700' :
                                                            'bg-gray-500 hover:bg-gray-600'}
                                                text-white border-0 font-bold
                                              `}>
                                                {app.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <select
                                                className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-1.5 outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
                                                value={app.status}
                                                onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="shortlisted">Shortlist</option>
                                                <option value="accepted">Accept</option>
                                                <option value="rejected">Reject</option>
                                            </select>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
