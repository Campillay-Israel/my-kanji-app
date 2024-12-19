import React from "react"; 
import { MdOutlinePushPin } from "react-icons/md"; 
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  kotoba,
  tags,
  lectura,
  frase,
  español,
  ingles,
  isPinned,
  onEdit,
  onDelete,
  onPinKoto,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out max-w-full relative">
      {/* Ícono de pin en la esquina superior derecha */}
      <MdOutlinePushPin
        className={`icon-btn absolute top-2 right-2 ${isPinned ? "text-primary" : "text-slate-300"}`}
        onClick={onPinKoto}
      />

      {/* Centrar Kotoba en la tarjeta */}
      <div className="flex flex-col items-center">
        <h6 className="text-2xl font-bold mb-1">{kotoba}</h6> {/* Texto grande y centrado */}
        <span className="text-xs text-slate-500">{tags}</span>
      </div>

      {/* Trunca o ajusta el texto de kunyomi y onyomi */}
      <p className="text-xs text-slate-600 mt-2 truncate">Lectura: {lectura?.slice(0, 60)}</p>

      {/* Información en columnas */}
      <div className="flex flex-col mt-2 gap-1">
        <div className="text-xs text-slate-500 break-words">Ej: {frase}</div>
        <div className="text-xs text-slate-500 break-words">Trd-Es: {español}</div>
        <div className="text-xs text-slate-500 break-words">Trd-En: {ingles}</div>
      </div>

      {/* Íconos para editar y eliminar en la esquina inferior derecha */}
      <div className="absolute bottom-2 right-2 flex gap-2">
        <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
        <MdDelete className="icon-btn hover:text-red-600" onClick={onDelete} />
      </div>
    </div>
  );
};

export default NoteCard;
