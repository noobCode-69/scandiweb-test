import React from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import PDP from "./pages/PDP/index";
import ProductAdd from "./pages/ProductAdd";
import PageNotFound from "./pages/404/";
import { Provider } from "react-redux";
import { store } from "./state";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import useToast from "./hooks/useToast";

type ToastContextType = {
  showToast: (message: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

const App: React.FC = () => {
  const { showToast, ToastContainer } = useToast();

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ToastContext.Provider value={{ showToast }}>
            <ToastContainer />
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/add-product" element={<ProductAdd />} />
                <Route path="/" element={<PDP />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </ToastContext.Provider>
        </Provider>
      </I18nextProvider>
    </>
  );
};

export default App;
