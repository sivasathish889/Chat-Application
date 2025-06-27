"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import Image from "next/image";
import getAvatarSrc from "../../helpers/getAvatarFormat";


const ProfileCard = () => {
  const [userData, setUserData] = useState({
    username: "",
    avatar: "",
    status : ""
  });
  useEffect(() => {
    const fetchUser = async () =>
      await axios
        .get("api/currentUser")
        .then((data) => setUserData(JSON.parse(data.data.userData)))
        .catch((err) => console.log(err));
    fetchUser();
  }, []);

  return (
    <>
      <div className="profile-card flex justify-center items-center px-2 py-2">
        <div className="profile-pic rounded-full">
          <div className=" rounded-full w-16 h-16 overflow-hidden">
            <Image
              src={getAvatarSrc(userData.avatar)}
              width={100}
              height={100}
              alt="avatar"
              style={{width:"100%", height : "100%", objectFit : "cover"}}
              loading="lazy"
            />
          </div>
        </div>
        <div className="profile-name-status flex flex-col justify-center items-start px-3">
          <p className="text-sm ">
            {userData.username.charAt(0).toUpperCase() + userData.username.slice(1)}
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
      <hr className="opacity-45 my-3" />
    </>
  );
};

export default ProfileCard;
