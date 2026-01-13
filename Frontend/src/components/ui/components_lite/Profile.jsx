import React from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Contact, Mail, MailboxIcon, Pen } from "lucide-react";
import { Badge } from "../badge";
import { Label } from "../label";
import AppliedJob from "./AppliedJob";

const skills = ["React", "JavaScript", "HTML", "CSS", "Python", "Node.js"];

const Profile = () => {
  const isResume = true;

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4x1 mx-auto bg-white border border-gray-400 rounded-2xl my-5 p-8 shadow shadow-gray-500 hover:shadow-green-800">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="">starkjames@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="">1020304050</span>
          </div>
        </div>
        <div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
              {skills.length != 0 ? (
                skills.map((item, index) => <Badge key={index}>{item}</Badge>)
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
              {isResume ? (
                <a
                  target="_blank"
                  href={"https://www.youtube.com"}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Download
                  {/* {user?.profile?.resumeOriginalName} */}
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
             {/* Add Application Table */}
             <AppliedJob/>
        </div>
    </div>
  );
};

export default Profile;
