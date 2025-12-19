"use client";

import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import Image from "next/image";
import getAvatarSrc from "../../api/helpers/getAvatarFormat";
import ProfileCardSkel from "../skeleton/ProfileCardSkel";
import { useGlobalContext } from "../../context/globalContext";

const ProfileCard = () => {


  const { userData } = useGlobalContext()
  return (
    <>
      <div className="profile-card flex justify-center items-center px-2 py-2">
        {userData.avatar ? (
          <div className="profile-content flex items-center">
            <div className="profile-pic rounded-full">
              <div className="rounded-full w-16 h-16 overflow-hidden">
                <Image
                  src={getAvatarSrc(userData.avatar)}
                  width={100}
                  height={100}
                  alt="avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="profile-name-status flex flex-col justify-center items-start px-3">
              <p className="text-sm ">
                {userData.username.charAt(0).toUpperCase() +
                  userData.username.slice(1)}
              </p>
              {userData.status == "Online" ? (
                <div className="status text-green-800 flex items-center text-sm">
                  <GoDotFill /> Online
                </div>
              ) : (
                <div className="status text-red-800 flex items-center text-sm">
                  <GoDotFill /> Offline
                </div>
              )}
            </div>
          </div>
        ) : (
          <ProfileCardSkel />
        )}
      </div>
      <hr className="opacity-45 my-3" />
    </>
  );
};

export default ProfileCard;
