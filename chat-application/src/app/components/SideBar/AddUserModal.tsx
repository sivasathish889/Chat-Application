import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { RiUserSearchLine } from "react-icons/ri";
import Image from "next/image";
import getAvatarSrc from "../../helpers/getAvatarFormat";
import { userType } from "../../types/user.type";
import { toast } from "sonner";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

if (Modal.defaultStyles.overlay) {
  Modal.defaultStyles.overlay.backgroundColor = "rgba(1,1,1,0.7)";
}

const AddUserModal = ({ modalIsOpen, closeModal }: ModalProps) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [optionSelect, setOptionSelect] = useState<string>("");

  if (Modal.defaultStyles.overlay) {
    Modal.defaultStyles.overlay.backgroundColor = "rgba(1,1,1,0.7)";
  }

  const handleSearch = async () => {
    try {
      await axios.get(`/api/searchUser?email=${search}`).then((res) => {
        if (JSON.parse(res.data).success) {
          setResults(JSON.parse(res.data).users || []);
        } else {
          toast.error(JSON.parse(res.data).message);
        }
      });
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleSelect = useCallback((userId: string) => {
    setOptionSelect(userId);
    setSearch("");
  }, []);

  const handleInvite = async () => {
    const formData = new FormData();
    formData.append("inviterId", optionSelect);
    try {
      await axios
        .post("api/inviteUser", formData)
        .then((res) => {
          if (res.data.success) {
            setResults([])
            setOptionSelect("")
            toast.success(res.data.message);
          } else {
            throw new Error(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          }
        })
        .finally(() => {
          closeModal();
        });
    } catch {
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        ariaHideApp={false}
      >
        <div className="flex justify-center">
          <h2 className="text-center mb-5 underline">Add User</h2>
          <MdCancel
            className="absolute right-4 top-2 cursor-pointer"
            size={20}
            color="red"
            onClick={closeModal}
          />
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex">
            <input
              type="search"
              placeholder="Search User"
              className="w-64 rounded-xl px-2 py-1 border border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <RiUserSearchLine
              className=" m-2 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          {results ?  (
            <ul className="bg-white rounded shadow p-2 max-h-40 overflow-y-auto">
              {results.map((user: userType, index) => (
                <li
                  className={`flex p-2 cursor-pointer ${
                    optionSelect == user._id ? "bg-primary" : "bg-gray-50"
                  }`}
                  key={index}
                  onClick={() => handleSelect(user._id)}
                >
                  <Image
                    src={getAvatarSrc(user?.avatar)}
                    width={50}
                    height={50}
                    alt="avatar"
                    className=""
                    loading="lazy"
                  />
                  <p className="text-sm ms-2">{user.email}</p>
                </li>
              ))}
            </ul>
          ) :<p>no invite</p>}
          <button
            className="border bg-primary py-1 rounded-sm"
            onClick={handleInvite}
          >
            Invite
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddUserModal;
