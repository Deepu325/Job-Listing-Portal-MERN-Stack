import React from "react";
import { Badge } from "../badge";

const JobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-[#f1f2f2] border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-400 hover:p-3 ">
      <div>
        <h1 className="text-lg font-medium">Company Name</h1>
        <p className="text-sm text-gray-600">India</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">Job Title</h2>
        <p className="text-sm text-gray-600"> Job Description</p>
      </div>
      <div className=" flex gap-2 items-center mt-4 ">
        <Badge className={" text-[#054601] font-bold"} variant={"ghost"}>
          10 positions
        </Badge>
        <Badge className={" text-[#135943] font-bold"} variant={"ghost"}>
          salary - 10LPA
        </Badge>
         <Badge className={" text-[#11385f]  font-bold"} variant={"ghost"}>
            {/*  location */}
            Remote
        </Badge>
        <Badge className={" text-black font-bold"} variant={"ghost"}>
            Full Time
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
