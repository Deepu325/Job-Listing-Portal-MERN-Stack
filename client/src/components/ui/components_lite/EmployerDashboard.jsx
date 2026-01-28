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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="h-10 w-10 animate-spin text-green-700" />
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
                                        <p className="text-gray-400 italic mb-4">You haven't posted any jobs yet.</p>
                                        <Button className="bg-green-700 hover:bg-green-800">
                                            <Plus className="mr-2 h-4 w-4" /> Post Your First Job
                                        </Button>
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
                                            <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50">View</Button>
                                            <Button variant="ghost" className="text-gray-400 hover:text-red-600 hover:bg-red-50">Delete</Button>
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
                                                <span className="font-bold text-gray-900">{app.applicant?.name}</span>
                                                <span className="text-xs text-gray-500">{app.applicant?.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600 font-medium">{app.job?.title || 'Job Deleted'}</TableCell>
                                        <TableCell>
                                            <Badge className={`
                        ${app.status === 'rejected' ? 'bg-red-500' :
                                                    app.status === 'accepted' ? 'bg-green-600' :
                                                        app.status === 'shortlisted' ? 'bg-blue-600' :
                                                            'bg-gray-500'}
                      `}>
                                                {app.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <select
                                                    className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-2 py-1 outline-none"
                                                    value={app.status}
                                                    onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="shortlisted">Shortlist</option>
                                                    <option value="accepted">Accept</option>
                                                    <option value="rejected">Reject</option>
                                                </select>
                                            </div>
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
