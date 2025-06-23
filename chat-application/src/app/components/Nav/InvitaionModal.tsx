import axios from "axios";
import React, { useEffect } from "react";
import Modal from "react-modal";

if (Modal.defaultStyles.overlay) {
  Modal.defaultStyles.overlay.backgroundColor = "rgba(1,1,1,0.7)";
}

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const InvitaionModal = ({ modalIsOpen, closeModal }: ModalProps) => {
  useEffect(() => {
    const fetchInviteData = async () => {
      await axios.get("api/getInvitedUser").then((res) => console.log(res.data.inviterData));
    };
    fetchInviteData();
  },);
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
      ></Modal>
    </>
  );
};

export default InvitaionModal;
