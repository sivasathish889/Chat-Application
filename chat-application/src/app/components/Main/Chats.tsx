import React, { useContext, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Chats = () => {
  const msgInChat = useSelector((state: RootState) => state.setMsgStoreInChat);
  const currentChatUser = useSelector(
    (state: RootState) => state.currentChatUser
  );
  console.log(currentChatUser);
  return (
    <div className=" h-full mx-2 flex flex-col  justify-end overflow-y-scroll ">
      {msgInChat
        ? msgInChat.map((msgDetails, index) => {
            if (currentChatUser._id === msgDetails.senderId) {
              if (msgDetails.chatStatus !== "Sender") {
                return (
                  <div
                    key={index}
                    className="to-chat flex justify-start items-start mb-1"
                  >
                    <div className="profile flex justify-center items-center">
                      <CgProfile size={30} className="mx-2" />
                    </div>
                    <div className="chat-message px-2 flex-col bg-primary rounded-lg flex justify-center items-center p-1">
                      <div className="message text-sm">
                        {msgDetails.message}
                      </div>
                      <div className="time text-[.4em] opacity-50 self-end">
                        11:00 pm
                      </div>
                    </div>
                  </div>
                );
              } else if (msgDetails.chatStatus !== "Sender") {
                return null;
              }
            } else if (msgDetails.chatStatus !== "Receiver") {
              return (
                <div
                  key={index}
                  className="from-chat flex justify-end items-end mb-1"
                >
                  <div className="chat-message p-2 bg-primary rounded-lg flex justify-center items-center">
                    <div className="message text-sm">{msgDetails.message}</div>
                    <div className="time text-[.4em] opacity-50 self-end">
                      11:00 pm
                    </div>
                  </div>
                  <div className="profile flex justify-center items-center">
                    <CgProfile size={30} className="mx-2" />
                  </div>
                </div>
              );
            }
            return null;
          })
        : null}
    </div>
  );
};

export default Chats;
