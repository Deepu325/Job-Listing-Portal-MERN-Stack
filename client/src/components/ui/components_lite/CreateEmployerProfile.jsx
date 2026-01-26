import React, { useState, useEffect } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { Textarea } from '../textarea';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Building, Globe, MapPin, Mail, Phone, Hash } from 'lucide-react';

const CreateEmployerProfile = () => { // Can also serve as Edit if pre-populated
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        description: '',
        location: '',
        website: '',
        industry: '',
        companyEmail: '',
        phone: ''
    });

    useEffect(() => {
        // Check if profile exists to populate for editing
        const fetchProfile = async () => {
            try {
                const res = await api.get('/api/v1/profile/employer');
                if (res.data) {
                    setFormData({
                        companyName: res.data.companyName || '',
                        description: res.data.companyDescription || '',
                        location: res.data.location || '',
                        website: res.data.website || '',
                        industry: res.data.industry || '',
                        companyEmail: res.data.companyEmail || '',
                        phone: res.data.phone || ''
                    });
                }
            } catch (error) {
                // Ignore 404, valid for new profile
            }
        }
        fetchProfile();
    }, []);

    const changeHandler = (e) => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, logo: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("companyName", formData.companyName);
        data.append("description", formData.description);
        data.append("location", formData.location);
        data.append("website", formData.website);
        data.append("industry", formData.industry);
        data.append("companyEmail", formData.companyEmail);
        data.append("phone", formData.phone);
        if (formData.logo) {
            data.append("logo", formData.logo);
        }

        try {
            const res = await api.post('/api/v1/profile/employer', data);
            toast.success("Profile updated successfully!");
            navigate('/profile');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="px-8 py-6 bg-primary text-white">
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            <Building className="h-8 w-8" />
                            Company Profile
                        </h1>
                        <p className="text-primary-foreground/90 mt-2">Manage your company information</p>
                    </div>

                    <form onSubmit={submitHandler} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Building className="h-4 w-4 text-primary" /> Company Logo
                                </Label>
                                <Input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
                                    onChange={changeHandler}
                                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 file:bg-primary/10 file:text-primary file:border-0 file:rounded-lg file:mr-4 file:px-4 file:py-2 hover:file:bg-primary/20 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Building className="h-4 w-4 text-primary" /> Company Name
                                </Label>
                                <Input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={changeHandler}
                                    placeholder="e.g. Acme Corp"
                                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Hash className="h-4 w-4 text-primary" /> Industry
                                </Label>
                                <Input
                                    type="text"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={changeHandler}
                                    placeholder="e.g. Technology, Healthcare"
                                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-primary" /> Website
                                </Label>
                                <Input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={changeHandler}
                                    placeholder="https://example.com"
                                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" /> Location
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={changeHandler}
                                    placeholder="City, Country"
                                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-primary" /> Public Email
                                </Label>
                                <Input
                                    type="email"
                                    name="companyEmail"
                                    value={formData.companyEmail}
                                    onChange={changeHandler}
                                    placeholder="contact@company.com"
                                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary" /> Phone
                                </Label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={changeHandler}
                                    placeholder="+1 234 567 890"
                                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                                />
                            </div>

                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700">Description</Label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={changeHandler}
                                placeholder="Tell us about your company..."
                                className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 min-h-[150px]"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-xl shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5"
                            >
                                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Profile'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployerProfile;
