import Image from "next/image";
import React from "react";
import samplePic from "@/public/uploads/73067ff5-cdbe-4e9f-820b-386e8953d565UCETjpg.jpg";
const ProfileDetail = () => {
  return (
    <div>
      <div className="container">
        <div className="profile-pic bg-rose-900 h-56 w-full">
          <Image
            src={samplePic}
            alt="profile-pic"
            className="h-full w-full bg-cover"
            priority={true}
          />
        </div>
        <div className="name text-center  my-4">
          <h2 className="text-xl">Siva Sathish</h2>
          <p className="text-sm opacity-50 px-2">Nothing is permanant for everything </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
