import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Contact, Mail, Pen, FileText } from "lucide-react";
import { Badge } from "../badge";
import AppliedJob from "./AppliedJob";
import api from "../../../utils/api";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/v1/profile/jobseeker");
        setProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        // If 404, maybe redirect to create profile or show empty state
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

  // Fallback if no profile data found (e.g. user hasn't created one yet)
  if (!profile) return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-xl">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Pen className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Profile</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            You haven't set up your profile yet. A complete profile helps employers find you and increases your chances of getting hired.
          </p>
          <div className="space-y-4 max-w-sm mx-auto mb-8">
            {/* ... instructions ... */}
            <div className="flex items-center gap-4 text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-white p-2 rounded-lg shadow-sm"><Mail className="h-5 w-5 text-green-600" /></div>
              <span className="text-gray-700 font-medium">Add contact info</span>
            </div>
            <div className="flex items-center gap-4 text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-white p-2 rounded-lg shadow-sm"><Contact className="h-5 w-5 text-green-600" /></div>
              <span className="text-gray-700 font-medium">Showcase your skills</span>
            </div>
            <div className="flex items-center gap-4 text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-white p-2 rounded-lg shadow-sm"><Pen className="h-5 w-5 text-green-600" /></div>
              <span className="text-gray-700 font-medium">Upload resume</span>
            </div>
          </div>
          <Button
            onClick={() => window.location.href = '/create-profile'}
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
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          {/* Banner/Header Gradient */}
          <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-600 relative">
            <div className="absolute top-4 right-4">
              <Link to="/edit-profile">
                <Button variant="secondary" className="bg-white/90 hover:bg-white text-green-700 border-0 shadow-sm backdrop-blur-sm">
                  <Pen className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-8 pb-8">
            {/* Avatar & Header Info */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-end -mt-12 mb-6 gap-6">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg ring-1 ring-gray-100 bg-white">
                <AvatarImage
                  src={profile.profilePicture ? `http://localhost:4000/${profile.profilePicture}` : "https://github.com/shadcn.png"}
                  alt={profile.fullName}
                  className="object-cover"
                />
              </Avatar>
              <div className="flex-1 pb-2">
                <h1 className="text-3xl font-bold text-gray-900">{profile.fullName}</h1>
                <p className="text-lg text-gray-500 font-medium mt-1">{profile.education || "No education details added"}</p>
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
                  <p className="text-sm font-semibold text-gray-900 break-all">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                  <Contact className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-semibold text-gray-900">{profile.phone || "Not provided"}</p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills && profile.skills.length !== 0 ? (
                  profile.skills.map((item, index) => (
                    <Badge key={index} className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 text-sm border border-gray-200 shadow-sm font-medium">
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500 italic">No skills listed</span>
                )}
              </div>
            </div>

            {/* Resume Section */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Resume</h2>
              {profile.resume ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`http://localhost:4000/${profile.resume}`}
                  className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow group max-w-md"
                >
                  <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-green-600 group-hover:text-green-700">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-900 group-hover:text-green-800">{profile.resumeOriginalName}</p>
                    <p className="text-xs text-gray-500">Click to preview or download</p>
                  </div>
                </a>
              ) : (
                <div className="text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-dashed border-gray-200">No resume uploaded</div>
              )}
            </div>

          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Application History</h2>
          <AppliedJob />
        </div>

      </div>
    </div>
  );
};

export default Profile;
