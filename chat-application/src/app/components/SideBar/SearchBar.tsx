import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import AddUserModal from "./AddUserModal";

const SearchBar = () => {
  const [modalIsOpen, setIsOpen] =useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="px-1">
      <div className="searchBar">
        <div className="searchInput relative flex flex-row justify-center items-center gap-2">
          <FaSearch
            className="absolute z-10 top-2 left-4 opacity-55"
            size={14}
          />
          <input
            type="text"
            name="search"
            id="search"
            className=" rounded-3xl ps-6 py-1 text-gray-600 text-sm"
            placeholder="Search"
          />
          <RiUserAddFill className="opacity-80 cursor-pointer" size={18} onClick={openModal}/>
        </div>
        <AddUserModal closeModal={closeModal} modalIsOpen={modalIsOpen} />
      </div>
      <hr className="opacity-45 my-3" />
    </div>
  );
};

export default SearchBar;
