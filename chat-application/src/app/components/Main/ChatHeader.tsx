import Image from "next/image";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { CiMenuKebab } from "react-icons/ci";
import getAvatarSrc from "../../helpers/getAvatarFormat";

interface ChatHeaderProps {
  currentChatUser: {
    username: string;
    email: string;
    avatar: string;
  };
}

const ChatHeader = ({ currentChatUser }: ChatHeaderProps) => {
  const { avatar, email, username } = currentChatUser;
  return (
    <div className="flex flex-col flex-1  m-2">
      <header className="flex bg-gray-400/50 rounded-lg p-2  justify-between">
        <div className="left-profile flex gap-2">
          <div className="w-10 h-10 overflow-hidden rounded-full ">
                    <Image
                      src={getAvatarSrc(avatar)}
                      alt="contact-profile"
                      width={100}
                      height={100}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
          <div className="profile-name-date">
            <p className="text-sm">{username}</p>
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
