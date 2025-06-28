import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "next/image";
import getAvatarSrc from "../../helpers/getAvatarFormat";
import axios from "axios";
import { setCurrentChatUser } from "../../redux/slices/currectChatUserSlice";

export interface chatDataProps {
  username: string;
  avatar: string;
  recentChat?: string;
  date?: string;
  email: string;
  _id: string;
}

const ChatList = () => {
  const [isChatSelect, setIsChatSelect] = useState("");
  const dispatch = useDispatch();
  const chatData: chatDataProps[] = [
    // {
    //   avatar:
    //     "C:\\Users\\sumit\\Desktop\\Projects\\Chat Application\\chat-application\\public\\uploads\\fff69d4d-3926-465f-aa57-6bddb5ceb21dDSC_0555.JPG",
    //   username: "Siva Sathish",
    //   recentChat: "How Are you",
    //   date: "11:00 pm",
    //   _id: "685b5e809af53a0ff09db55c",
    //   email: "sathishsathish96489@gmail.com ",
    // },
    // {
    //   avatar:
    //     "C:\\Users\\sumit\\Desktop\\Projects\\Chat Application\\chat-application\\public\\uploads\\fff69d4d-3926-465f-aa57-6bddb5ceb21dDSC_0555.JPG",
    //   username: "Siva ",
    //   recentChat: "How Are you",
    //   date: "11:00 pm",
    //   _id: "685b57e09af53a0ff09db4d3",
    //   email: "rdxsathish@gmail.com ",
    // },
  ];
  const currentChatUser = useSelector(
    (state: RootState) => state.setContactToChat
  );
  currentChatUser.username !== "" ? chatData.unshift(currentChatUser) : "";
  useEffect(() => {
    setIsChatSelect(currentChatUser._id);
  }, []);
  const handleSelect = async (
    _id: string,
    username: string,
    email: string,
    avatar: string
  ) => {
    try {
      dispatch(setCurrentChatUser({ username, email, avatar, _id }));
      const res = await axios.get(`api/getUserChat?id=${_id}`);
      console.log(res.data);
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
        {chatData.map(
          ({ date, avatar, email, username, recentChat, _id }, index) => (
            <div
              className={`content flex justify-between py-2 px-1 ${
                isChatSelect == _id ? "bg-secondary cursor-pointer" : ""
              }`}
              key={index}
              onClick={() => {
                handleSelect(_id, username, email, avatar);
                setIsChatSelect(_id);
                dispatch(setCurrentChatUser({ _id, username, email, avatar }));
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
                  <p className="opacity-75 text-[.7em]">{recentChat}</p>
                </div>
              </div>
              <div className="time">
                <p className="text-[.5em] opacity-50">{date}</p>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default ChatList;
