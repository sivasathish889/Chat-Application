"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
type ProfileCardProps = {
  status: string;
};

const ProfileCard = ({ status }: ProfileCardProps) => {
  const [userData, setUserData] = useState({
    username: "",
  });
  useEffect(() => {
    const fetchUser = async () =>
      await axios
        .get("api/currentUser")
        .then((data) => console.log(data.data))
        .catch((err) => console.log(err));
    fetchUser();
  }, []);
  // console.log("userData", userData);
  return (
    <>
      <div className="profile-card flex justify-center items-center px-2 py-2">
        <div className="profile-pic">
          <CgProfile size={50} />
        </div>
        <div className="profile-name-status flex flex-col justify-center items-start px-3">
          <p className="text-sm ">{userData.username} dsfdf</p>
          {status == "online" ? (
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
