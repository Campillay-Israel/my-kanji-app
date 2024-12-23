import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditKoto from "./AddEditKoto";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddKotosImag from "../../assets/images/add-kotos.svg";
import NoDataImg from "../../assets/images/no-data.svg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [AllKotos, setAllKotos] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };
  const handleCloseToast = () => {
    console.log("Cerrando Toast");
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Obtener información del usuario
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Error al obtener la información del usuario:", error);
      }
    }
  };

  //GEt all kotos

  const getAllKotos = async () => {
    try {
      const response = await axiosInstance.get("/get-all-kotos");
      if (response.data && response.data.kotobas) {
        setAllKotos(response.data.kotobas);
      }
    } catch (error) {
      console.log("Error inesperado, intento nuevamente");
    }
  };
  // Delete koto

  const deleteKoto = async (data) => {
    const kotoId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-koto/" + kotoId);

      // Validar si la respuesta tiene datos esperados

      if (response.data && !response.data.error) {
        showToastMessage("Tarjeta eliminada con éxito", "delete");
        getAllKotos(); // Actualiza la lista de 'kotos'
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Error inesperado, intento nuevamente");
      }
    }
  };

  //Search
  const onSearchKoto = async (query) => {
    try {
      const response = await axiosInstance.get("/search-kotos", {
        params: { query },
      });
      if (response.data && response.data.kotobas) {
        setIsSearch(true);
        setAllKotos(response.data.kotobas);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllKotos();
  };

  const updateIsPinned = async (kotoData) => {
    const kotoId = kotoData._id;
    try {
      const response = await axiosInstance.put(
        "/update-koto-pinned/" + kotoId,
        {
          isPinned: !kotoData.isPinned,
        }
      );

      // Validar si la respuesta tiene datos esperados
      console.log(response.data.kotoba);
      if (response.data) {
        showToastMessage("Tarjeta editada con éxito");
        getAllKotos(); // Actualiza la lista de 'kotos'
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllKotos();
    getUserInfo();
  }, []);

  const handleAddNewKoto = () => {
    setOpenAddEditModal({ isShown: true, type: "add", data: null });
  };

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  return (
    <>
      <Navbar
        userInfo={userInfo || null}
        onSearchKoto={onSearchKoto}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        {AllKotos.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {AllKotos.map((item, index) => (
              <NoteCard
                key={item._id}
                kotoba={item.kotoba}
                date={item.createOn}
                lectura={item.lectura}
                frase={item.frase}
                español={item.español}
                ingles={item.ingles}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteKoto(item)}
                onPinKoto={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddKotosImag}
            message={
              isSearch
                ? "Opps! Ninguna tarjeta coincide con la búsqueda"
                : userInfo
                ? "Agrega tus primeras tarjetas de vocabulario con el botón rojo +"
                : "Logéate o crea una cuenta para empezar con tus tarjetas"
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 fixed right-10 bottom-10"
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
          getAllKotos={getAllKotos}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type} 
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
