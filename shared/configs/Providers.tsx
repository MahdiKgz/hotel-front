"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
}

export default Providers;
