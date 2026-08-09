"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          colorPrimary: "#f3ad12",
          colorInfo: "#f3ad12",
          colorLink: "#a66d00",
          colorText: "#272727",
          colorTextSecondary: "#747474",
          colorBorder: "#deddd8",
          colorBgContainer: "#ffffff",
          borderRadius: 12,
          borderRadiusLG: 18,
          controlHeightLG: 48,
          fontFamily: "ShabnamFarsi, sans-serif",
        },
        components: {
          Button: {
            primaryShadow: "0 8px 20px rgba(243, 173, 18, 0.2)",
            fontWeight: 700,
          },
          Input: {
            activeBorderColor: "#d89a0f",
            activeShadow: "0 0 0 3px rgba(243, 173, 18, 0.12)",
            hoverBorderColor: "#d89a0f",
          },
          Table: {
            headerBg: "#f7f6f2",
            headerColor: "#505050",
            rowHoverBg: "#fffbf1",
            borderColor: "#eceae4",
          },
          Drawer: {
            colorBgElevated: "#202428",
          },
        },
      }}
    >
      <Provider store={store}>{children}</Provider>
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
    </ConfigProvider>
  );
}

export default Providers;
