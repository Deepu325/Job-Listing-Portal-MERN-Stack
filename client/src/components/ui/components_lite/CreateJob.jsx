import React, { useState, useEffect } from 'react';
import { Button } from '../button';
import { Label } from '../label';
import { Input } from '../input';
import { Briefcase, MapPin, DollarSign, FileText, ArrowLeft, Loader2, Tag } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        jobType: 'Full-time',
        salaryMin: '',
        salaryMax: '',
        currency: 'USD',
        skills: ''
    });

    useEffect(() => {
        const checkProfile = async () => {
            try {
                // We check if the employer has a profile, otherwise backend will error on job creation
                await api.get('/api/v1/profile/employer');
            } catch (error) {
                if (error.response?.status === 404) {
                    toast.error('Please complete your company profile before posting a job');
                    navigate('/create-employer-profile');
                }
            }
        };
        checkProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.location) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);

            // Prepare job data
            const jobData = {
                title: formData.title,
                description: formData.description,
                location: formData.location,
                jobType: formData.jobType,
                salary: {
                    min: Number(formData.salaryMin) || 0,
                    max: Number(formData.salaryMax) || 0,
                    currency: formData.currency
                },
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
            };

            await api.post('/api/v1/jobs', jobData);
            toast.success('Job posted successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Failed to create job', error);
            toast.error(error.response?.data?.message || 'Failed to create job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="max-w-3xl mx-auto my-10 px-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Post a New Job</h1>
                    <p className="text-gray-600 mb-8 text-center">Fill in the details to attract the best candidates</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Job Title */}
                        <div>
                            <Label htmlFor="title" className="flex items-center gap-2 mb-2">
                                <Briefcase className="h-4 w-4" />
                                Job Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Senior React Developer"
                                className="w-full"
                                required
                            />
                        </div>

                        {/* Job Description */}
                        <div>
                            <Label htmlFor="description" className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4" />
                                Job Description <span className="text-red-500">*</span>
                            </Label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the role, responsibilities, requirements, and what makes this position exciting..."
                                className="w-full min-h-[180px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Be detailed - this helps attract the right candidates</p>
                        </div>

                        {/* Location */}
                        <div>
                            <Label htmlFor="location" className="flex items-center gap-2 mb-2">
                                <MapPin className="h-4 w-4" />
                                Location <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., Remote, San Francisco, CA, or New York"
                                className="w-full"
                                required
                            />
                        </div>

                        {/* Job Type */}
                        <div>
                            <Label htmlFor="jobType" className="flex items-center gap-2 mb-2">
                                <Briefcase className="h-4 w-4" />
                                Job Type <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="jobType"
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                                required
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        {/* Salary Range */}
                        <div>
                            <Label className="flex items-center gap-2 mb-3">
                                <DollarSign className="h-4 w-4" />
                                Salary Range (Optional)
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="salaryMin" className="text-sm text-gray-600 mb-1">Minimum</Label>
                                    <Input
                                        type="number"
                                        id="salaryMin"
                                        name="salaryMin"
                                        value={formData.salaryMin}
                                        onChange={handleChange}
                                        placeholder="50000"
                                        className="w-full"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="salaryMax" className="text-sm text-gray-600 mb-1">Maximum</Label>
                                    <Input
                                        type="number"
                                        id="salaryMax"
                                        name="salaryMax"
                                        value={formData.salaryMax}
                                        onChange={handleChange}
                                        placeholder="120000"
                                        className="w-full"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="currency" className="text-sm text-gray-600 mb-1">Currency</Label>
                                    <select
                                        id="currency"
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                                    >
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                        <option value="INR">INR (₹)</option>
                                        <option value="CAD">CAD ($)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Required Skills */}
                        <div>
                            <Label htmlFor="skills" className="flex items-center gap-2 mb-2">
                                <Tag className="h-4 w-4" />
                                Required Skills
                            </Label>
                            <Input
                                type="text"
                                id="skills"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="e.g., React, Node.js, MongoDB, TypeScript"
                                className="w-full"
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate multiple skills with commas</p>
                        </div>

                        {/* Preview */}
                        {formData.title && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-green-800 mb-2">Preview:</p>
                                <h3 className="text-lg font-bold text-gray-900">{formData.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {formData.location && `📍 ${formData.location}`}
                                    {formData.jobType && ` • ${formData.jobType}`}
                                </p>
                                {(formData.salaryMin || formData.salaryMax) && (
                                    <p className="text-sm text-green-700 font-semibold mt-2">
                                        💰 {formData.currency} {formData.salaryMin || '0'} - {formData.salaryMax || '0'}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/profile')}
                                className="flex-1 py-3"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-green-700 hover:bg-green-800 py-3"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        Posting Job...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Briefcase className="h-5 w-5" />
                                        Post Job
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateJob;
