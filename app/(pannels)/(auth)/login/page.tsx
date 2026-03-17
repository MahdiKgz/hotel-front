import LoginForm from "@/features/login/ui/LoginForm";
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <div className="bg-white w-80 p-7 rounded-xl flex flex-col items-center justify-center gap-8">
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
    </div>
  );
}

export default Login;
