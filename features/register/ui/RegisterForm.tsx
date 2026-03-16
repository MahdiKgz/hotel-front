"use client";
import React from "react";
import { RHFInput } from "@/shared/ui/RHFInput";
import { Button } from "antd";
import { FormProvider } from "react-hook-form";
import useRegister from "../hooks/useRegister";

function RegisterForm() {
  const { methods, handleSubmit, onSubmit, shouldDisableForm } = useRegister();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center gap-4.5"
      >
        <RHFInput name="fullName" placeholder="نام کامل خود را وارد کنید" />
        <RHFInput name="phone" placeholder="شماره تلفن خود را وارد کنید" />
        <RHFInput
          name="password"
          placeholder="رمز عبور خود را وارد کنید"
          isPassword
        />

        <Button
          htmlType="submit"
          size="large"
          color="primary"
          variant="solid"
          className="w-full"
          disabled={shouldDisableForm}
        >
          ایجاد حساب
        </Button>
      </form>
    </FormProvider>
  );
}

export default RegisterForm;
