import React from "react";
import ProfileDetail from "./Profile/ProfileDetail";
import ProfileMedia from "./Profile/ProfileAbout";

const ProfileBar = () => {
  return (
    <div className="flex flex-col">
      <div >
        <ProfileDetail />
      </div>
      <div className="h-screen">
        <ProfileMedia />
      </div>
    </div>
  );
};

export default ProfileBar;
