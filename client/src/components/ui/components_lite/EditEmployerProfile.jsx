import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../button';
import { Label } from '../label';
import { Input } from '../input';
import { Building2, Mail, Phone, MapPin, Globe, Briefcase, ArrowLeft, Loader2 } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'sonner';

const EditEmployerProfile = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        companyName: '',
        companyEmail: '',
        contactPhone: '',
        location: '',
        website: '',
        industry: '',
        companyDescription: ''
    });

    // Fetch existing profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/api/v1/profile/employer');
                const profile = res.data;
                setFormData({
                    companyName: profile.companyName || '',
                    companyEmail: profile.companyEmail || '',
                    contactPhone: profile.contactPhone || '',
                    location: profile.location || '',
                    website: profile.website || '',
                    industry: profile.industry || '',
                    companyDescription: profile.companyDescription || ''
                });
            } catch (error) {
                console.error('Failed to fetch profile', error);
                toast.error('Failed to load profile data');
                navigate('/profile');
            } finally {
                setFetching(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.companyName || !formData.companyEmail) {
            toast.error('Please fill in required fields');
            return;
        }

        try {
            setLoading(true);
            await api.post('/api/v1/profile/employer', formData);
            toast.success('Profile updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Failed to update profile', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto my-10 px-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Profile
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Edit Company Profile</h1>
                    <p className="text-gray-600 mb-8 text-center">Update your company information</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Company Name */}
                        <div>
                            <Label htmlFor="companyName" className="flex items-center gap-2 mb-2">
                                <Building2 className="h-4 w-4" />
                                Company Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="TechCorp Inc."
                                className="w-full"
                                required
                            />
                        </div>

                        {/* Company Email */}
                        <div>
                            <Label htmlFor="companyEmail" className="flex items-center gap-2 mb-2">
                                <Mail className="h-4 w-4" />
                                Company Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="email"
                                id="companyEmail"
                                name="companyEmail"
                                value={formData.companyEmail}
                                onChange={handleChange}
                                placeholder="hr@company.com"
                                className="w-full"
                                required
                            />
                        </div>

                        {/* Contact Phone */}
                        <div>
                            <Label htmlFor="contactPhone" className="flex items-center gap-2 mb-2">
                                <Phone className="h-4 w-4" />
                                Contact Phone
                            </Label>
                            <Input
                                type="tel"
                                id="contactPhone"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567"
                                className="w-full"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <Label htmlFor="location" className="flex items-center gap-2 mb-2">
                                <MapPin className="h-4 w-4" />
                                Location
                            </Label>
                            <Input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="San Francisco, CA"
                                className="w-full"
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <Label htmlFor="website" className="flex items-center gap-2 mb-2">
                                <Globe className="h-4 w-4" />
                                Website
                            </Label>
                            <Input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://www.company.com"
                                className="w-full"
                            />
                        </div>

                        {/* Industry */}
                        <div>
                            <Label htmlFor="industry" className="flex items-center gap-2 mb-2">
                                <Briefcase className="h-4 w-4" />
                                Industry
                            </Label>
                            <select
                                id="industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                            >
                                <option value="">Select industry</option>
                                <option value="Technology">Technology</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Retail">Retail</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Consulting">Consulting</option>
                                <option value="Media">Media</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Company Description */}
                        <div>
                            <Label htmlFor="companyDescription" className="flex items-center gap-2 mb-2">
                                <Building2 className="h-4 w-4" />
                                About Company
                            </Label>
                            <textarea
                                id="companyDescription"
                                name="companyDescription"
                                value={formData.companyDescription}
                                onChange={handleChange}
                                placeholder="Tell candidates about your company, culture, and what makes it a great place to work..."
                                className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
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
                                        Saving...
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEmployerProfile;
