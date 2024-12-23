import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddEditKoto = ({
  kotoData,
  type,
  getAllKotos,
  onClose,
  showToastMessage,
}) => {
  const [kotoba, setKoto] = useState(kotoData?.kotoba || "");
  const [lectura, setLectura] = useState(kotoData?.lectura || "");
  const [ejemplo, setEjemplo] = useState(kotoData?.frase || "");
  const [espanol, setEspanol] = useState(kotoData?.español || "");
  const [ingles, setIngles] = useState(kotoData?.ingles || "");
  const [tags, setTags] = useState(kotoData?.tags || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  // Add Koto
  const addNewKoto = async () => {
    setLoading(true); 
    try {
      const response = await axiosInstance.post("/add-koto", {
        kotoba, // Palabra o kanji
        tags, // Array de tags
        lectura, // Lectura de la palabra o kanji
        frase: ejemplo, // Ejemplo de uso
        español: espanol, // Traducción en español
        ingles, // Traducción en inglés
      });

      // Validar si la respuesta tiene datos esperados
      console.log(response.data.kotoba);
      if (response.data) {
        showToastMessage("Tarjeta agregada exitosamente");

        getAllKotos(); // Actualiza la lista de 'kotos'
        onClose(); // Cierra el modal
      }
    } catch (error) {
      console.error(error); // Para depurar el error si es necesario
      if (error.code === "ECONNABORTED") {
        setError("El servidor está tardando demasiado, intente nuevamente.");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Error inesperado ha ocurrido, intente nuevamente.");
      }
    } finally {
      setLoading(false); 
    }
  };

  // Edit Koto
  const editKoto = async () => {
    const kotoId = kotoData._id;
    
    setLoading(true); 
    try {
      const response = await axiosInstance.put("/edit-koto/" + kotoId, {
        kotoba, // Palabra o kanji
        tags, // Array de tags
        lectura, // Lectura de la palabra o kanji
        frase: ejemplo, // Ejemplo de uso
        español: espanol, // Traducción en español
        ingles, // Traducción en inglés
      });

      console.log(response.data.kotoba);
      if (response.data) {
        showToastMessage("Tarjeta editada con éxito");
        getAllKotos(); 
        onClose(); 
      }
    } catch (error) {
      console.error(error); 
      if (error.code === "ECONNABORTED") {
        setError("El servidor está tardando demasiado, intente nuevamente.");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Error inesperado ha ocurrido, intente nuevamente.");
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleAddKoto = () => {
    if (!kotoba) {
      setError("Inserte una palabra o kanji");
      return;
    }
    if (!ejemplo) {
      setError("Inserte un ejemplo de uso");
      return;
    }
    if (!tags.length) {
      setError("Inserte al menos un tag");
      return;
    }

    setError("");
    if (type === "edit") {
      editKoto();
    } else {
      addNewKoto();
    }

    const newKoto = {
      kotoba,
      lectura,
      ejemplo,
      espanol,
      ingles,
      tags,
    };

    console.log("Nuevo Koto:", newKoto);

    setKoto("");
    setLectura("");
    setEjemplo("");
    setEspanol("");
    setIngles("");
    setTags([]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      
      <button
        type="button"
        className="absolute left-1/2 transform -translate-x-1/2 top-5 w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 z-10"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <MdClose className="text-xl text-gray-500" />
      </button>

      {/* Card */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        {/* Contenido del formulario */}
        <div>
          {/* Campos de entrada */}
          <div className="flex flex-col gap-2">
            <label className="input-label">言葉 - WORD - 漢字</label>
            <input
              type="text"
              className="text-2xl text-gray-900 outline-none border-b border-gray-300 focus:border-blue-500"
              placeholder="図書館"
              value={kotoba}
              onChange={({ target }) => setKoto(target.value)}
            />
          </div>

    
          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">LECTURA</label>
            <textarea
              className="text-sm text-gray-900 outline-none bg-gray-50 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500"
              placeholder="(Hiragana, Romaji)"
              rows={3}
              value={lectura}
              onChange={({ target }) => setLectura(target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">ESPAÑOL</label>
            <textarea
              className="text-sm text-gray-900 outline-none bg-gray-50 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500"
              placeholder="Traducción en Español"
              rows={3}
              value={espanol}
              onChange={({ target }) => setEspanol(target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">INGLÉS</label>
            <textarea
              className="text-sm text-gray-900 outline-none bg-gray-50 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500"
              placeholder="Traducción en Inglés"
              rows={3}
              value={ingles}
              onChange={({ target }) => setIngles(target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">EJEMPLO</label>
            <textarea
              className="text-sm text-gray-900 outline-none bg-gray-50 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500"
              placeholder="Palabra en contexto"
              rows={3}
              value={ejemplo}
              onChange={({ target }) => setEjemplo(target.value)}
            />
          </div>

          <div className="mt-3">
            <label className="input-label">TAGS</label>
            <TagInput tags={tags} setTags={setTags} />
          </div>

          {error && (
            <p className="text-red-500 text-xs pb-1 text-center bg-gray-100 rounded-md py-1">
              {error}
            </p>
          )}

          <button
            type="button"
            className="btn-primary font-medium mt-5 p-3 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleAddKoto}
            disabled={loading} 
          >
            {loading ? "Cargando..." : type === "edit" ? "Editar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditKoto;
