import React from "react";
import { BsEmojiLaughing } from "react-icons/bs";
import { IoImageOutline, IoMicOutline } from "react-icons/io5";
import { PiTelegramLogoBold } from "react-icons/pi";

const MessageSendBar = () => {
  return (
    <div className="flex p-3 justify-center items-center ">
      <div className="input-box w-full relative flex justify-center">
        <BsEmojiLaughing size={19} className="absolute top-3 cursor-pointer left-4 z-10"/>
        <input
          type="text"
          name="text"
          id="text"
          className="w-full rounded-full h-10 relative px-10 pe-20 outline-none bg-gray-400/50 text-sm"
        />
        <IoMicOutline size={25} className="absolute right-14 bottom-2 cursor-pointer"/>
        <IoImageOutline size={24} className="absolute right-4 bottom-2 cursor-pointer"/>
      </div>
      <div className="send-message m-2 bg-primary p-2 rounded-full cursor-pointer">
        <PiTelegramLogoBold size={20} className="opacity-70"/>
      </div>
    </div>
  );
};

export default MessageSendBar;
