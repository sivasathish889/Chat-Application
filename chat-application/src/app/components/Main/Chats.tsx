import React from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Chats = () => {
    const msgstoreInChat = useSelector((state: RootState)=>state.setMsgStoreInChat)
  
  return (
    <div className=" h-full mx-2 flex flex-col justify-end overflow-y-scroll ">
      <div className="to-chat flex justify-start items start">
        <div className="profile flex justify-center items-center ">
          <CgProfile size={30}className="mx-2" />
        </div>
        <div className="chat-message px-2 flex-col bg-primary rounded-lg flex justify-center items-center p-1">
          <div className="message text-sm">Hellow how are you</div>
          <div className="time text-[.4em] opacity-50 self-end">11:00 pm</div>
        </div>
      </div>

      <div className="from-chat flex justify-end items-end">
        <div className="chat-message p-2 bg-primary rounded-lg flex justify-center items-center   ">
          <div className="message text-sm">{msgstoreInChat.message}</div>
          <div className="time text-[.4em] opacity-50 self-end">11:00 pm</div>
        </div>
        <div className="profile flex justify-center items-center ">
          <CgProfile size={30} className="mx-2"/>
        </div>
      </div>

      
    </div>
  );
};

export default Chats;
