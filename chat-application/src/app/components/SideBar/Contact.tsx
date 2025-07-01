"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { userType } from "../../types/user.type";
import getAvatarSrc from "../../helpers/getAvatarFormat";
import { useDispatch } from "react-redux";
import { setCurrentChatUser } from "../../redux/slices/currectChatUserSlice";
import { setToggleChatToContact } from "../../redux/slices/chatToContactTogle";
import { setContactToChat } from "../../redux/slices/contactToChatSlice";

const Contact = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchUserContacts = async () => {
        const fetchedData = await axios.get("api/getContacts");
        setData(fetchedData.data.contactsUsers);
      };
      fetchUserContacts();
    } catch  {
      toast.error("Something Went Wrong");
    }
  }, []);
  const handleClick = (
    username: string,
    email: string,
    avatar: string,
    _id: string
  ) => {
    dispatch(setContactToChat({ username, email, avatar, _id }));
    dispatch(setToggleChatToContact("chats"));
    dispatch(setCurrentChatUser({ username, email, avatar, _id }));
  };
  return (
    <>
      <div className="container">
        <ul>
          {data
            ? data.map(({ username, email, avatar, _id }: userType, index) => (
                <li
                  className="border-b p-2 hover:bg-secondary cursor-pointer flex gap-2"
                  key={index}
                  onClick={() => handleClick(username, email, avatar, _id)}
                >
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
                  <div>
                    <p className="text-sm">{username}</p>
                    <p className="text-xs">{email}</p>
                  </div>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </>
  );
};

export default Contact;
