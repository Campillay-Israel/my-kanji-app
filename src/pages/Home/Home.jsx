import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditKoto from "./AddEditKoto";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const handleAddNewKoto = () => {
    setOpenAddEditModal({ isShown: true, type: "add", data: null });
  };

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            kotoba="ありがとうございます"
            date="3rd Apr 2024"
            lectura="arigatogozaimasu"
            frase="本当にありがとうございます。"
            español="Muchas gracias"
            ingles="Thank you so much"
            tags="N5"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinKoto={() => {}}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 absolute right-10 bottom-10"
        onClick={handleAddNewKoto}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditKoto
          type={openAddEditModal.type}
          kotoData={openAddEditModal.data}
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default Home;
