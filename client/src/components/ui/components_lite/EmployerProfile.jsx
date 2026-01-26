import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Contact, Mail, Pen, Globe, MapPin, Building, Phone } from "lucide-react";
import api from "../../../utils/api";
import { Link } from "react-router-dom";

const EmployerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get(`/api/v1/profile/employer?t=${new Date().getTime()}`);
                setProfile(res.data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading profile...</p>
            </div>
        </div>
    );

    // Fallback if no profile data found
    if (!profile) return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-xl">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                        <Building className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Company Profile</h1>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                        Complete your company profile to attract the best talent.
                    </p>
                    <Button
                        onClick={() => window.location.href = '/create-employer-profile'}
                        className="w-full sm:w-auto px-8 py-6 text-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 rounded-xl"
                    >
                        Create Company Profile
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Profile Card */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                    {/* Banner */}
                    <div className="h-32 bg-gradient-to-r from-primary to-teal-800 relative">
                        <div className="absolute top-4 right-4">
                            <Link to="/edit-employer-profile">
                                <Button variant="secondary" className="bg-white/90 hover:bg-white text-primary border-0 shadow-sm backdrop-blur-sm">
                                    <Pen className="mr-2 h-4 w-4" /> Edit Profile
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        {/* Header Info */}
                        <div className="relative flex flex-col sm:flex-row items-start sm:items-end -mt-12 mb-6 gap-6">
                            <Avatar className="h-32 w-32 border-4 border-white shadow-lg ring-1 ring-gray-100 bg-white">
                                <AvatarImage
                                    src={profile.logo ? `http://localhost:4000/${profile.logo}` : "https://github.com/shadcn.png"}
                                    alt={profile.companyName}
                                    className="object-cover"
                                />
                            </Avatar>
                            <div className="flex-1 pb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{profile.companyName}</h1>
                                <p className="text-lg text-gray-500 font-medium mt-1">{profile.industry || "Industry not specified"}</p>
                            </div>
                        </div>

                        {/* Contact Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</p>
                                    <p className="text-sm font-semibold text-gray-900 break-all">{profile.companyEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                                    <Globe className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Website</p>
                                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-600 hover:underline">{profile.website || "Not provided"}</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Location</p>
                                    <p className="text-sm font-semibold text-gray-900">{profile.location || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone</p>
                                    <p className="text-sm font-semibold text-gray-900">{profile.phone || "Not provided"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-4">About Company</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{profile.companyDescription || "No description provided."}</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default EmployerProfile;
