import React from "react";
import ChatHeader from "./Main/ChatHeader";
import Chats from "./Main/Chats";
import MessageSendBar from "./Main/MessageSendBar";

const Main = () => {
  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader />
      <Chats/>
      <MessageSendBar />
    </div>
  );
};

export default Main;
