import React from "react";
import { CgProfile } from "react-icons/cg";
import { CiMenuKebab } from "react-icons/ci";

const ChatHeader = () => {
  return (
    <div className="flex flex-col flex-1  m-2">
      <header className="flex bg-gray-400/50 rounded-lg p-2  justify-between">
        <div className="left-profile flex gap-2">
          <div className="profile-pic">
            <CgProfile size={35} />
          </div>
          <div className="profile-name-date">
            <p className="text-sm">Siva sathish</p>
            <p className="text-xs">Last seen at 11:00pm</p>
          </div>
        </div>
        <div className="right-profile flex justify-center items-center">
          <CiMenuKebab />
        </div>
      </header>
    </div>
  );
};

export default ChatHeader;
