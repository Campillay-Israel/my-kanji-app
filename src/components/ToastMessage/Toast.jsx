import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDelete, MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (isShown) {
      console.log("Toast mostrado");
      const timer = setTimeout(() => {
        console.log("Toast cerrándose...");
        onClose();
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-400 transform ${
        isShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md relative overflow-hidden ${
          type === "delete" ? "border-red-500" : "border-green-500"
        }`}
      >
        <div
          className={`absolute w-[5px] h-full top-0 left-0 ${
            type === "delete" ? "bg-red-500" : "bg-green-500"
          }`}
        />
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
