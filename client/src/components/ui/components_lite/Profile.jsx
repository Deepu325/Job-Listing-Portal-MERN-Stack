import React, { useState, useEffect, useContext } from "react";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Contact, Mail, Pen, FileText, LayoutDashboard, Briefcase, Users } from "lucide-react";
import { Badge } from "../badge";
import AppliedJob from "./AppliedJob";
import EmployerDashboard from "./EmployerDashboard";
import api from "../../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const endpoint = user?.role === "Employer"
          ? "/api/v1/profile/employer"
          : "/api/v1/profile/jobseeker";
        const res = await api.get(endpoint);
        setProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    </div>
  );

  const isEmployer = user?.role === "Employer";

  // Fallback if no profile data found
  if (!profile) return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-xl">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Pen className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Profile</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            {isEmployer
              ? "You haven't set up your company profile yet. A complete profile helps you attract the best talent."
              : "You haven't set up your profile yet. A complete profile helps employers find you and increases your chances of getting hired."}
          </p>
          <Button
            onClick={() => navigate(isEmployer ? '/create-employer-profile' : '/create-profile')}
            className="w-full sm:w-auto px-8 py-6 text-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 rounded-xl"
          >
            Create Your Profile
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Profile Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-600 relative">
            <div className="absolute top-4 right-4">
              <Link to={isEmployer ? "/edit-employer-profile" : "/edit-profile"}>
                <Button variant="secondary" className="bg-white/90 hover:bg-white text-green-700 border-0 shadow-sm backdrop-blur-sm">
                  <Pen className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="relative flex flex-col sm:flex-row items-start sm:items-end -mt-12 mb-6 gap-6">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg ring-1 ring-gray-100 bg-white">
                <AvatarImage
                  src={profile.logo || profile.profilePicture ? `http://localhost:4000/${profile.logo || profile.profilePicture}` : "https://github.com/shadcn.png"}
                  alt={profile.companyName || profile.fullName}
                  className="object-cover"
                />
              </Avatar>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900">{profile.companyName || profile.fullName}</h1>
                  <Badge className={isEmployer ? "bg-green-100 text-green-700 border-green-200" : "bg-blue-100 text-blue-700 border-blue-200"}>
                    {user?.role}
                  </Badge>
                </div>
                <p className="text-lg text-gray-500 font-medium mt-1">
                  {isEmployer ? profile.industry : (profile.education || "Job Seeker")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</p>
                  <p className="text-sm font-semibold text-gray-900 break-all">{profile.companyEmail || profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                  <Contact className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-gray-900">{profile.location || "Not provided"}</p>
                </div>
              </div>
            </div>

            {!isEmployer && profile.skills && (
              <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} className="bg-gray-100 text-gray-600 border-0">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Sections */}
        {isEmployer ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-green-700" />
              Employer Dashboard
            </h2>
            <EmployerDashboard />
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-green-700" />
              Application History
            </h2>
            <AppliedJob />
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
