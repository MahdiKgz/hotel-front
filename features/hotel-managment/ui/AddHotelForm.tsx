"use client";
import React from "react";
import { RHFInput } from "@/shared/ui/RHFInput";
import { FormProvider } from "react-hook-form";
import useAddHotel from "../hooks/useAddHotel";
import { Button } from "antd";
import RHFSelect from "@/shared/ui/RHFSelect";

function AddHotelForm() {
  const { methods, handleSubmit, onSubmit } = useAddHotel();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-4"
      >
        <div className="w-full flex items-start gap-3">
          <RHFInput
            name="name"
            size="middle"
            placeholder="نام هتل را وارد کنید"
          />
          <RHFInput
            name="slug"
            size="middle"
            placeholder="اسم اختصاری را وارد کنید"
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFSelect
            name="country"
            placeholder="کشور را انتخاب کنید"
            options={[{ value: 1, label: "ایران" }]}
          />
          <RHFSelect
            name="city"
            placeholder="شهر را انتخاب کنید"
            options={[{ value: 1, label: "تهران" }]}
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFInput
            name="address"
            size="middle"
            placeholder="آدرس هتل را وارد کنید"
          />
          <RHFInput
            name="postalCode"
            size="middle"
            placeholder="کدپستی هتل را وارد کنید"
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFSelect
            name="city"
            placeholder="تعداد ستاره های هتل را انتخاب کنید"
            options={[{ value: "1", label: "یک ستاره" }]}
          />
          <RHFSelect
            name="metroAccess"
            placeholder="دسترسی به مترو را انتخاب کنید"
            options={[{ value: "YES", label: "دارد" }]}
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFSelect
            name="manager_id"
            placeholder="مسئول هتل را انتخاب کنید"
            options={[{ value: 1, label: "علی محمدی" }]}
          />
        </div>

        <RHFInput
          name="description"
          size="middle"
          placeholder="کوتاه درباره هتل بنویسید"
          isTextArea
        />
        <div className="w-full flex justify-end">
          <Button htmlType="submit">ثبت</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddHotelForm;
