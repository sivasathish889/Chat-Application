import React from "react";

const ProfileCardSkel: React.FC = () => (
  <div className="animate-pulse flex items-center rounded-lg p-4 w-80">
    <div className="w-10 h-10 bg-gray-300 rounded-full mr-4" />
    <div className="flex-1">
      <div className="h-4 bg-gray-300 rounded w-32 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-20" />
    </div>
  </div>
);

export default ProfileCardSkel;
