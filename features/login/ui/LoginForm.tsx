"use client";

import React from "react";
import useLogin from "../hooks/useLogin";
import { Button } from "antd";
import { FormProvider } from "react-hook-form";
import PasswordMethodLogin from "./PasswordMethodLogin";
import OTPMethodLogin from "./OTPMethodLogin";

function LoginForm() {
  const {
    mode,
    setMode,
    methods,
    handleSubmit,
    onSubmit,
    shouldDisableForm,
    isVerifyingOTP,
    isSubmittingRequest,
  } = useLogin();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="auth-form"
      >
        {mode === "password" ? (
          <PasswordMethodLogin />
        ) : (
          <OTPMethodLogin methods={methods} />
        )}
        {process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_ENABLE_DEMO_SMS_OTP === "true" && <Button
          type="link"
          onClick={() =>
            mode === "password" ? setMode("otp") : setMode("password")
          }
          size="small"
          className="auth-method-button"
        >
          {mode === "password" ? "ورود با رمز یکبار مصرف" : "ورود با رمز عبور"}
        </Button>}
        <Button
          className="auth-submit-button"
          size="large"
          color="primary"
          variant="solid"
          htmlType="submit"
          disabled={shouldDisableForm}
          loading={isSubmittingRequest || isVerifyingOTP}
        >
          ورود به حساب
        </Button>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
