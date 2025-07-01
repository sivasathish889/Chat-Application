import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "next/image";
import getAvatarSrc from "../../helpers/getAvatarFormat";
import axios from "axios";
import { setCurrentChatUser } from "../../redux/slices/currectChatUserSlice";
import { setContactToChat } from "../../redux/slices/contactToChatSlice";
import { setMsgStoreInChat, Msg } from "../../redux/slices/msgStoreInChatSlice";

export interface chatDataProps {
  username: string;
  avatar: string;
  email: string;
  _id: string;
}

const ChatList = () => {
  const [isChatSelect, setIsChatSelect] = useState("");
  const [chatData, setchatData] = useState<chatDataProps[]>([]);
  const dispatch = useDispatch();
  const currentChatUser = useSelector(
    (state: RootState) => state.setContactToChat
  );
  const msgStoreInChat = useSelector(
    (state: RootState) => state.setMsgStoreInChat
  );
  useEffect(() => {
    const fetchChatData = async () => {
      const res = await axios.get("api/getChatListByUser");
      setchatData(res.data.friends);
    };
    fetchChatData();
  }, [msgStoreInChat]);

  useEffect(() => {
    if (
      currentChatUser.username &&
      !chatData.some((chat) => chat._id === currentChatUser._id)
    ) {
      setchatData((prev) => [currentChatUser, ...prev]);
      setIsChatSelect(currentChatUser._id);
    } else {
      setIsChatSelect(currentChatUser._id);
    }
  }, [currentChatUser, chatData]);

  const handleSelect = async (_id: string) => {
    try {
      const res = await axios.get(`api/getUserChat?id=${_id}`);
      const data = res.data.chats;
      data.forEach((item: Msg) => {
        dispatch(
          setMsgStoreInChat({
            message: item.message,
            receiverId: item.receiverId,
            senderId: item.senderId,
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className="mb-1 px-1 font-semibold">
        <p className="text-xs">Chats</p>
      </header>
      <main>
        {chatData.map(({ avatar, email, username, _id }, index) => (
          <div
            className={`content flex justify-between py-2 px-1 ${
              isChatSelect == _id ? "bg-secondary cursor-pointer" : ""
            }`}
            key={index}
            onClick={() => {
              handleSelect(_id);
              setIsChatSelect(_id);
              dispatch(setContactToChat({ username, email, avatar, _id }));
              dispatch(setCurrentChatUser({ username, email, avatar, _id }));
            }}
          >
            <div className="flex gap-1">
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
              <div className="message text-xs">
                <p>{username}</p>
                <p className="opacity-75 text-[.7em]">recentChat</p>
              </div>
            </div>
            <div className="time">
              <p className="text-[.5em] opacity-50"></p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ChatList;
