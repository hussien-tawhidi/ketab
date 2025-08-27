// components/toast/ToastContext.jsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { BiError } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", position = "top-right") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type, position }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getPositionClass = (position) => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {["top-right", "top-left", "bottom-left", "bottom-right"].map((pos) => (
        <div
          key={pos}
          className={`fixed z-[9999] space-y-2 ${getPositionClass(pos)}`}>
          {toasts
            .filter((toast) => toast.position === pos)
            .map((toast) => (
              <div
                key={toast.id}
                className={`flex items-center justify-between gap-4 px-4 py-2 rounded-lg shadow-lg w-full animate-fade-in ${
                  toast.type === "success"
                    ? "text-ketab-green bg-ketab-light"
                    : toast.type === "error"
                    ? "bg-ketab-orange/20 text-ketab-orange"
                    : "bg-[#fff] text-[#474747]"
                }`}>
                <div className='flex items-center gap-2'>
                  {toast.type === "success" && (
                    <FaCheck className='text-ketab-green' />
                  )}
                  {toast.type === "error" && (
                    <BiError className='text-xl text-ketab-orange' />
                  )}
                  {toast.type === "info" && <FcInfo className='text-xl' />}
                  <span className='text-sm'>{toast.message}</span>
                </div>
                <button onClick={() => removeToast(toast.id)}>
                  <CgClose size={16} />
                </button>
              </div>
            ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};
