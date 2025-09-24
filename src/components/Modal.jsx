/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Modal = ({ image }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  useEffect(() => {
    // Add event listener to close modal when clicking outside the images
    const handleOutsideClick = (event) => {
      if (event.target.id === "modal") {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    // Remove event listener on component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [modalOpen]);

  const openModal = (src) => {
    setModalImageSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {image && (
        <div className="p-10 grid grid-cols-3 gap-5 max-[700px]:grid-cols-1 ">
          <img
            className="w-full h-full object-cover cursor-pointer"
            src={image[0]}
            alt="Img 1"
            onClick={() => openModal(image[0])}
          />

          <img
            className="w-full h-full object-cover cursor-pointer"
            src={image[1]}
            alt="Img 2"
            onClick={() => openModal(image[1])}
          />

          <img
            className="w-full h-full object-cover cursor-pointer"
            src={image[2]}
            alt="Img 3"
            onClick={() => openModal(image[2])}
          />
        </div>
      )}

      {modalOpen && (
        <div
          id="modal"
          className="fixed top-0 left-0 z-80 
                w-screen h-screen bg-black/70 
                flex justify-center items-center z-40"
        >
          <span
            className="fixed z-90 top-6 right-8 
                  text-white text-5xl font-bold cursor-pointer"
            onClick={closeModal}
          >
            ×
          </span>

          <img
            src={modalImageSrc}
            className="max-w-[800px] max-h-[600px] object-cover"
            alt="Modal"
          />
        </div>
      )}
    </>
  );
};

export default Modal;
