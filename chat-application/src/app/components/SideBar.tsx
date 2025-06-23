import React, { Suspense } from "react";
import ProfileCard from "./SideBar/ProfileCard";
import StatusCard from "./SideBar/StatusCard";
import { CgProfile } from "react-icons/cg";
import SearchBar from "./SideBar/SearchBar";
import ChatList from "./SideBar/ChatList";

export interface statusDataProps {
  image: React.JSX.Element;
  name: string;
  status: string;
}

export interface chatDataProps {
  name: string;
  image: React.JSX.Element;
  recentChat: string;
  date: string;
}

const SideBar = () => {
  const statusData: statusDataProps[] = [
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "sathish",
      status: "online",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "siva Sathish",
      status: "online",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "vasu",
      status: "online",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "sandy",
      status: "online",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "vishwa",
      status: "online",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "vishwa",
      status: "online",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "vishwa",
      status: "online",
    },
  ];

  const chatData: chatDataProps[] = [
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "Siva Sathish",
      recentChat: "How Are you",
      date: "11:00 pm",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "Siva ",
      recentChat: "How Are you",
      date: "11:00 pm",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "Sathish",
      recentChat: "How Are you",
      date: "11:00 pm",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "Santhiya",
      recentChat: "How Are you",
      date: "11:00 pm",
    },
    {
      image: <CgProfile className="h-9 w-9 min-h-2 max-h-9 min-w-2 max-w-9" />,
      name: "Sivasangaran",
      recentChat: "How Are you",
      date: "11:00 pm",
    },
  ];
  return (
    <div className="">
      <ProfileCard />
      <StatusCard data={statusData} />
      <SearchBar />
      <ChatList data={chatData} />
    </div>
  );
};

export default SideBar;
