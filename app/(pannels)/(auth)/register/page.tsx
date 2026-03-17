import React from "react";
import Link from "next/link";
import RegisterForm from "@/features/register/ui/RegisterForm";

function Register() {
  return (
    <div className="bg-white w-80 p-7 rounded-xl flex flex-col items-center justify-center gap-8">
      <div className="register-form__header w-full flex flex-col items-center justify-center gap-2">
        <h1 className="font-bold text-[18px]">ساخت حساب کاربری جدید</h1>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-xs">حساب کاربری دارید؟</span>
          <Link className="font-medium text-xs text-blue-500!" href="/login">
            ورود
          </Link>
        </div>
      </div>
      <RegisterForm />
    </div>
  );
}

export default Register;
