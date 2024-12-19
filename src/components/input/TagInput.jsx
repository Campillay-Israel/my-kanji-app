import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para errores

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage(""); // Limpiar mensaje de error al escribir
  };

  const addNewTag = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      setErrorMessage("Debe colocar un tag"); // Input vacío
      return;
    }

    if (tags.includes(trimmedValue)) {
      setErrorMessage("El tag ya está incluido"); // Tag duplicado
      return;
    }

    setTags([...tags, trimmedValue]); // Agregar nuevo tag
    setInputValue(""); // Limpiar input
    setErrorMessage(""); // Limpiar mensaje de error
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center bg-gray-200 px-2 py-1 rounded text-sm"
            >
              #{tag}
              <button
                className="ml-1 text-red-600 hover:text-red-800"
                onClick={() => handleRemoveTag(tag)}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Agrega etiquetas (ej. N5, verbo)"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>

      {/* Mostrar mensaje de error */}
      {errorMessage && (
              <p className="text-red-500 text-xs pb-1 text-center bg-gray-100 rounded-md py-1">
                {errorMessage}
              </p>
            )}
    </div>
  );
};

export default TagInput;
