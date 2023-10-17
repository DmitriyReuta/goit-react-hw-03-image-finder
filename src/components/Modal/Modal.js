import React from "react";
import Modal from "react-modal";

export const ModalComponent = ({ largeImageURL, onRequestClose }) => {
  return (
    <Modal
      isOpen={!!largeImageURL}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
    >
      <img src={largeImageURL} alt="" />
    </Modal>
  );
};