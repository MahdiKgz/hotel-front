"use client";
import React from "react";
import AuthAlert from "./AuthAlert";

export default function WithAuth(Component) {
  return function ProtectedComponent(props) {
    const token = sessionStorage.getItem("authToken");

    if (!token) return <AuthAlert />;

    return <Component {...props} />;
  };
}
