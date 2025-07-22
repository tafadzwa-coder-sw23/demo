import React from "react";

const Modal = ({ isOpen, onClose, children, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-300 ${darkMode ? "bg-black bg-opacity-70" : "bg-black bg-opacity-50"}`}
      onClick={onClose}
    >
      <div
        className={`rounded-lg p-6 w-full max-w-md transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal; 