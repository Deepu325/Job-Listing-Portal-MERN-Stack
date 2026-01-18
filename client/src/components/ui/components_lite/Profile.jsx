import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../badge";
import AppliedJob from "./AppliedJob";
import api from "../../../utils/api";

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

  if (loading) return <div>Loading...</div>;

  // Fallback if no profile data found (e.g. user hasn't created one yet)
  if (!profile) return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-5">
        <h1 className="text-xl">Profile not found. Please complete your profile.</h1>
        {/* Add button to create profile */}
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-400 rounded-2xl my-5 p-8 shadow shadow-gray-500 hover:shadow-green-800">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{profile.fullName}</h1>
              <p>{profile.education || "No education details"}</p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="">{profile.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="">{profile.phone || "NA"}</span>
          </div>
        </div>
        <div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
              {profile.skills && profile.skills.length !== 0 ? (
                profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="text-md font-bold"> Resume</label>
            <div>
              {profile.resume ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`http://localhost:4000/${profile.resume}`} // Assuming local serve
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Download {profile.resumeOriginalName}
                </a>
              ) : (
                <span>No Resume Found</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>
        <AppliedJob />
      </div>
    </div>
  );
};

export default Profile;
