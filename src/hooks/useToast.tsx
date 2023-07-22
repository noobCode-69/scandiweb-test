/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return <div className="toast">{message}</div>;
};

interface ToastContainerProps {
  toasts: string[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const toastContainer = document.getElementById("toast-container");
  return (
    <>
      {toastContainer &&
        createPortal(
          <div className="toast-container">
            {toasts.map((message, index) => (
              <Toast key={index} message={message} />
            ))}
          </div>,
          toastContainer
        )}
    </>
  );
};

interface ToastHook {
  showToast: (message: string) => void;
  ToastContainer: React.FC;
}

const useToast = (): ToastHook => {
  const [toasts, setToasts] = useState<string[]>([]);

  const showToast = (message: string) => {
    setToasts((prevToasts) => [...prevToasts, message]);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const toastTimer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, 3000);

      return () => clearTimeout(toastTimer);
    }
  }, [toasts]);

  return {
    showToast,
    ToastContainer: () => <ToastContainer toasts={toasts} />,
  };
};

export default useToast;
