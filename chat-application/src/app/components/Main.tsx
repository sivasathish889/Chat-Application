import React from "react";
import ChatHeader from "./Main/ChatHeader";
import Chats from "./Main/Chats";
import MessageSendBar from "./Main/MessageSendBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Main = () => {
  const currentChatUser = useSelector((state:RootState)=>state.currentChatUser)
  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader currentChatUser={currentChatUser}/>
      <Chats/>
      <MessageSendBar />
    </div>
  );
};

export default Main;
