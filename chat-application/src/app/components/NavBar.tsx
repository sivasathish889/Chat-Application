import React, { useState } from "react";
import { CiLogout, CiMenuFries, CiSettings } from "react-icons/ci";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setExpandNav } from "../redux/slices/navBarSlice";
import { RootState } from "../redux/store";
import { GiCancel } from "react-icons/gi";
import { MdGroupAdd } from "react-icons/md";
import InvitaionModal from "./Nav/InvitaionModal";
import { setToggleChatToContact } from "../redux/slices/chatToContactTogle";
import type { ChatToContactToggleStateProp } from "../redux/slices/chatToContactTogle";
import { IoMdContacts } from "react-icons/io";
import axios from "axios";
import { toast } from "sonner";
const NavBar = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const expandNav = useSelector((state: RootState) => state.expandNav);
  const chatToContactToggle = useSelector(
    (state: RootState) => state.chatToContactToggleSLice
  );

  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(setExpandNav());
  };

  const toggleContactToChat = (propertyName: ChatToContactToggleStateProp) => {
    dispatch(setToggleChatToContact(propertyName));
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get("api/logout");
      toast.success(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container flex flex-col h-screen  bg-lime-300">
        <div
          className="option-icon text-center my-4 cursor-pointer"
          onClick={toggle}
        >
          {expandNav ? (
            <div className="flex justify-center">
              <CiMenuFries strokeWidth={2} className="self-center" />
            </div>
          ) : (
            <div className="flex justify-end items-end me-2">
              <GiCancel size={17} />
            </div>
          )}
        </div>

        <div className="option-icon text-center self-center space-y-5">
          <div
            className={`flex items-center gap-1 cursor-pointer px-2 ${
              chatToContactToggle === "chats"
                ? "bg-primary px-2 py-1 rounded-sm"
                : ""
            }`}
            onClick={() => toggleContactToChat("chats")}
          >
            <IoChatbubblesOutline size={24} strokeWidth={0.6} />
            {!expandNav ? <p className="text-sm">Chats</p> : <></>}
          </div>
          <div
            className={`flex items-center gap-1 cursor-pointer px-2 ${
              chatToContactToggle === "contacts"
                ? "bg-primary px-2 py-1 rounded-sm"
                : ""
            }`}
            onClick={() => toggleContactToChat("contacts")}
          >
            <IoMdContacts size={24} strokeWidth={0.6} />
            {!expandNav ? <p className="text-sm">Chats</p> : <></>}
          </div>
          <div
            className={`flex items-center gap-1 cursor-pointer px-2 py-1 ${
              modalIsOpen ? "bg-primary px-2 py-1 rounded-sm" : ""
            }`}
            onClick={openModal}
          >
            <MdGroupAdd size={24} />
            {!expandNav ? <p className="text-sm">Invite</p> : <></>}
          </div>
        </div>
        <div className="settng flex  items-end h-full self-center  cursor-pointer">
          <div className="flex items-center gap-1">
            <CiSettings size={24} strokeWidth={0.6} />
            {!expandNav ? <p className="text-sm">Settings</p> : <></>}
          </div>
        </div>

        <div className="logout text-center bg-red-700 text-white rounded-full p-1 m-2 cursor-pointer">
          <div className="flex items-center gap-1" onClick={handleLogout}>
            <CiLogout size={17} strokeWidth={0.6} />
            {!expandNav ? <p className="text-sm">Logout</p> : <></>}
          </div>
        </div>
      </div>
      <InvitaionModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};

export default NavBar;
