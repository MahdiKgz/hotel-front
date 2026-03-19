import LoginForm from "@/features/login/ui/LoginForm";
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <div className="bg-white shadow-lg shadow-sky-200 w-80 p-7 rounded-xl flex flex-col items-center justify-center gap-8 relative">
      <div className="register-form__header w-full flex flex-col items-center justify-center gap-2">
        <h1 className="font-bold text-[18px]">ورود به حساب کاربری </h1>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-xs">حساب کاربری ندارید؟</span>
          <Link className="font-medium text-xs text-blue-500!" href="/register">
            ثبت نام
          </Link>
        </div>
      </div>
      <LoginForm />
      <div className="absolute -z-1 -top-4 right-1/2 left-1/2 translate-x-1/2 mx-auto bg-sky-500! w-87 h-25 rounded-xl"></div>
    </div>
  );
}

export default Login;
