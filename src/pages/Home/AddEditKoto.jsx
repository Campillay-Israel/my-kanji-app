import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditKoto = ({ kotoData, type, onClose }) => {
  const [koto, setKoto] = useState("");
  const [lectura, setLectura] = useState("");
  const [ejemplo, setEjemplo] = useState("");
  const [espanol, setEspanol] = useState("");
  const [ingles, setIngles] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  //Add Koto
  const addNewKoto = async () => {};

  // Edit Koto
  const editKoto = async () => {};

  const handleAddKoto = () => {
    if (!koto) {
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
      palabra: koto,
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
      {/* Contenedor para el botón, que estará fuera de la tarjeta */}
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
              value={koto}
              onChange={({ target }) => setKoto(target.value)}
            />
          </div>

          {/* Otros campos de formulario (lectura, ejemplo, tags, etc.) */}
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
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditKoto;
