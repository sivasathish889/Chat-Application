import React, { Suspense } from "react";
import ProfileCard from "./SideBar/ProfileCard";
import StatusCard from "./SideBar/StatusCard";
import { CgProfile } from "react-icons/cg";
import SearchBar from "./SideBar/SearchBar";
import ChatList from "./SideBar/ChatList";
import Contact from "./SideBar/Contact";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export interface statusDataProps {
  image: React.JSX.Element;
  name: string;
  status: string;
}


const SideBar = () => {
  const chatToContactToggle = useSelector(
    (state: RootState) => state.chatToContactToggleSLice
  );
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


  return (
    <div className="">
      <ProfileCard />
      {chatToContactToggle === "chats" ? (
        <>
          <StatusCard data={statusData} />
          <SearchBar />
          <ChatList  />
        </>
      ) : (
        <Contact />
      )}
    </div>
  );
};

export default SideBar;
