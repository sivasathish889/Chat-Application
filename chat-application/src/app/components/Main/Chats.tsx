"use client";

import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "next/image";
import getAvatarSrc from "../../api/helpers/getAvatarFormat";
import { useGlobalContext } from "../../context/globalContext";
import { useEffect, useRef } from "react";

const Chats = () => {
  const msgInChat = useSelector((state: RootState) => state.setMsgStoreInChat);
  const {userData} = useGlobalContext()
  const currentChatUser = useSelector(
    (state: RootState) => state.currentChatUser
  );

  // Auto-scroll: keep a ref at the end and scroll into view when messages change
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgInChat]);

  return (
    <div className="h-full mx-2 flex flex-col min-h-0 overflow-y-auto">
      {msgInChat
        ? msgInChat.map((msgDetails, index) => {
          if (!msgDetails.message) return null;
          if (currentChatUser._id === msgDetails.senderId) {
            return (
              <div
                key={index}
                className="to-chat flex justify-start items-start mb-1 gap-2"
              >
                <div className="profile flex justify-center items-center">
                  <Image alt="avatar" src={getAvatarSrc(currentChatUser.avatar)} width={100} height={100} className="rounded-full h-10 w-10 object-cover" />

                </div>
                <div className="chat-message px-2 flex-col bg-primary rounded-lg flex justify-center items-center p-1">
                  <div className="message text-sm">{msgDetails.message}</div>
                  <div className="time text-[.4em] opacity-50 self-end">
                    11:00 pm
                  </div>
                </div>
              </div>
            );
          } else if (currentChatUser._id == msgDetails.receiverId) {
            return (
              <div
                key={index}
                className="from-chat flex justify-end items-end mb-1 gap-2"
              >
                <div className="chat-message p-2 bg-primary rounded-lg flex justify-center items-center">
                  <div className="message text-sm">{msgDetails.message}</div>
                  <div className="time text-[.4em] opacity-50 self-end">
                    11:00 pm
                  </div>
                </div>
                <div className="profile flex justify-center items-center">
                  <Image alt="avatar" src={getAvatarSrc(userData.avatar)} width={100} height={100} className="rounded-full h-10 w-10 object-cover" />

                </div>
              </div>
            );
          }
          return null;
        })
        : null}
      <div ref={scrollEndRef} />
    </div>
  );
};

export default Chats;
