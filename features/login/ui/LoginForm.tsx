"use client";

import React from "react";
import Link from "next/link";
import useLogin from "../hooks/useLogin";
import { Button } from "antd";
import { FormProvider } from "react-hook-form";
import PasswordMethodLogin from "./PasswordMethodLogin";
import OTPMethodLogin from "./OTPMethodLogin";

function LoginForm() {
  const { mode, setMode, methods, handleSubmit, onSubmit, shouldDisableForm } =
    useLogin();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start justify-center gap-4.5"
      >
        {mode === "password" ? (
          <PasswordMethodLogin />
        ) : (
          <OTPMethodLogin methods={methods} />
        )}
        <Button
          type="link"
          onClick={() =>
            mode === "password" ? setMode("otp") : setMode("password")
          }
          size="small"
          className="text-sm!"
        >
          {mode === "password" ? "ورود با رمز یکبار مصرف" : "ورود با رمز عبور"}
        </Button>
        <Button
          className="w-full"
          size="large"
          color="primary"
          variant="solid"
          htmlType="submit"
          disabled={shouldDisableForm}
        >
          ورود به حساب
        </Button>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
