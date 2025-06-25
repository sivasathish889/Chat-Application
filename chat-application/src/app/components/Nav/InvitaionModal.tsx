import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { userType } from "../../types/user.type";
import Image from "next/image";
import getAvatarSrc from "../../helpers/getAvatarFormat";
import { MdCancel } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { toast } from "sonner";

if (Modal.defaultStyles.overlay) {
  Modal.defaultStyles.overlay.backgroundColor = "rgba(1,1,1,0.7)";
}

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const InvitaionModal = ({ modalIsOpen, closeModal }: ModalProps) => {
  const [inviterData, setInviterData] = useState<userType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    const fetchInviteData = async () => {
      await axios
        .get("api/getInvitedUser")
        .then((res) => {
          if (res.data.success) {
            setInviterData(res.data.invitedUsers);
          } else {
            throw new Error(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            console.log(err.response.data.message);
          }
          console.log(err);
        });
    };
    fetchInviteData();
  }, [refresh]);

  const handleInviterAccept = async (id: string) => {
    try {
      await axios
        .post("api/inviteAccept", { id })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setRefresh(!refresh);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleInviterReject = async (id: string) => {
    try {
      await axios
        .post("api/inviteReject", { id })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast.success(res.data.message);
            setRefresh(!refresh);
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
    } catch (error) {
      console.log(error);
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
        <div className="container">
          <header className="text-sm underline text-center">
            Inviters
            <MdCancel
              className="absolute right-4 top-2 cursor-pointer"
              size={20}
              color="red"
              onClick={closeModal}
            />
          </header>
          <div className="body">
            {inviterData.length !== 0
              ? inviterData.map(({ avatar, email, username, _id }, index) => (
                  <ul className="flex gap-2" key={index}>
                    <li className="flex  gap-2 py-2 cursor-pointer px-2 hover:bg-gray-200 justify-between flex-1">
                      <div className="flex  gap-2 ">
                        <Image
                          src={getAvatarSrc(avatar)}
                          width={50}
                          height={50}
                          alt="avatar"
                          className=""
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          <span>
                            {username.charAt(0).toUpperCase() +
                              username.slice(1)}
                          </span>
                          <span className="text-xs opacity-70">{email}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end items-center">
                        <FaUserCheck
                          size={20}
                          color="green"
                          onClick={() => handleInviterAccept(_id)}
                        />
                        <FaUserXmark
                          size={20}
                          color="red"
                          onClick={() => handleInviterReject(_id)}
                        />
                      </div>
                    </li>
                  </ul>
                ))
              : "No Invites"}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InvitaionModal;
