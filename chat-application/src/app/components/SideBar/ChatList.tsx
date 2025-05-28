import React from "react";
import { chatDataProps } from "../SideBar";
import { CgProfile } from "react-icons/cg";

const ChatList = ({ data }: { data: chatDataProps[] }) => {
  return (
    <div>
      <header className="mb-1 px-1 font-semibold">
        <p className="text-xs">Chats</p>
      </header>
      <main>
        {data.map(({date,image,name,recentChat}, index) => (
          <div className="content flex justify-between py-2 px-1 hover:bg-secondary cursor-pointer" key={index}>
            <div className="flex gap-1">
              <div className="profile-pic">
                {image}
              </div>
              <div className="message text-xs">
                <p>{name}</p>
                <p className="opacity-75 text-[.7em]">{recentChat}</p>
              </div>
            </div>
            <div className="time">
              <p className="text-[.5em] opacity-50">{date}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ChatList;
