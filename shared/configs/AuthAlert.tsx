"use client";
import React from "react";
import { Alert, Button } from "antd";
import Link from "next/link";

function AuthAlert() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
      <Alert
        className="text-2xl! font-bold p-6! rounded-xl!"
        title="شما مجاز به ورود به این صفحه نیستید"
        banner
        type="error"
      />

      <Link href="/register" className="p-4 h-6 rounded">
        <Button type="primary" color="blue" size="large">
          ورود به حساب کاربری
        </Button>
      </Link>
    </div>
  );
}

export default AuthAlert;
