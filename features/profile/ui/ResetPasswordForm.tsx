"use client";
import React, { Dispatch, SetStateAction } from "react";
import { RHFInput } from "@/shared/ui/RHFInput";
import { Button, Popconfirm } from "antd";
import { FormProvider } from "react-hook-form";
import useResetPassword from "../hooks/useResetPassword";

function ResetPasswordForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { methods, handleSubmit, onSubmit, shouldDisableForm } =
    useResetPassword();
  return (
    <FormProvider {...methods}>
      <form className="my-5 flex flex-col items-start gap-4">
        <RHFInput
          name="password"
          placeholder="رمز فعلی را وارد کنید"
          size="middle"
          isPassword
          rules={{ required: "رمز فعلی الزامی است." }}
        />
        <div className="w-full flex items-start gap-4">
          <RHFInput
            name="newPassword"
            placeholder="رمز جدید را وارد کنید"
            size="middle"
            rules={{ required: "رمز جدید الزامی است." }}
            isPassword
          />
          <RHFInput
            name="confirmNewPassword"
            placeholder="تکرار رمز جدید را وارد کنید"
            size="middle"
            rules={{ required: "تکرار رمز جدید الزامی است." }}
            isPassword
          />
        </div>
        <div className="w-full flex justify-end gap-2">
          <Button onClick={() => setOpen(() => false)}>انصراف</Button>
          <Popconfirm
            title="آیا مطمئن هستید؟"
            description="با این عمل رمز عبور شما تغییر خواهد کرد و از حساب خود خارج خواهید شد"
            onConfirm={handleSubmit(onSubmit)}
            okText="تایید"
            cancelText="انصراف"
            placement="bottom"
          >
            <Button disabled={shouldDisableForm} type="primary" color="blue">
              بازنشانی
            </Button>
          </Popconfirm>
        </div>
      </form>
    </FormProvider>
  );
}

export default ResetPasswordForm;
