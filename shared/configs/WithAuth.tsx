"use client";

import { ComponentType, useEffect, useState } from "react";
import { Spin } from "antd";
import AuthAlert from "./AuthAlert";

export default function WithAuth<Props extends object>(Component: ComponentType<Props>) {
  return function ProtectedComponent(props: Props) {
    const [authState, setAuthState] = useState<"checking" | "allowed" | "denied">("checking");

    useEffect(() => {
      setAuthState(sessionStorage.getItem("authToken") ? "allowed" : "denied");
    }, []);

    if (authState === "checking") {
      return (
        <div className="auth-guard-page">
          <Spin size="large" />
          <strong>در حال آماده‌سازی پنل هُما...</strong>
        </div>
      );
    }

    if (authState === "denied") return <AuthAlert />;
    return <Component {...props} />;
  };
}
