"use client";
import { RHFInput } from "@/shared/ui/RHFInput";
import { Button } from "antd";
import React from "react";
import { FormProvider } from "react-hook-form";
import useUpdateProfile from "../hooks/useUpdateProfile";

function ProfileForm() {
  const { methods, handleSubmit, onSubmit, isDirty } = useUpdateProfile();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto rounded-xl p-6 md:p-8 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <RHFInput
            name="fullName"
            label="نام کامل"
            placeholder="مثال: علی رضایی"
          />
          <RHFInput name="phone" label="شماره تلفن" placeholder="۰۹۱۲..." />
          <RHFInput
            name="email"
            label="ایمیل"
            type="email"
            placeholder="example@mail.com"
          />
          <RHFInput
            name="address"
            label="آدرس"
            placeholder="شهر، خیابان، پلاک..."
          />
          <RHFInput name="role" label="نقش" disabled isReadOnly />
          <RHFInput
            name="bio"
            label="بیوگرافی"
            isTextArea
            placeholder="درباره خود کوتاه بنویسید..."
          />
        </div>

        <div className="flex justify-end pt-2 gap-3">
          <Button
            disabled={!isDirty}
            htmlType="submit"
            type="primary"
            color="blue"
          >
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default ProfileForm;
