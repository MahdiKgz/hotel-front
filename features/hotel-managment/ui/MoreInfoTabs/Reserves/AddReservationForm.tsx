"use client";
import React from "react";
import useAddReserve from "@/features/hotel-managment/hooks/useAddReserve";
import { FormProvider } from "react-hook-form";
import RHFSelect from "@/shared/ui/RHFSelect";
import RHFDatePicker from "@/shared/ui/RHFDatePicker";
import { RHFInput } from "@/shared/ui/RHFInput";
import { Button } from "antd";

function AddReservationForm() {
  const { methods, handleSubmit, isValid, onSubmit } = useAddReserve();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-3.5 my-6"
      >
        <div className="w-full flex items-center gap-5">
          <RHFSelect
            placeholder="میهمان را انتخاب کنید"
            name="userId"
            rules={{ required: "میهمان را وارد کنید" }}
            options={[{ value: 1, label: "محمد امین محمدپور" }]}
          />
          <RHFSelect
            placeholder="اتاق را انتخاب کنید"
            name="roomId"
            rules={{ required: "اتاق را وارد کنید" }}
            options={[{ value: 1, label: "اتاق ماه عسل" }]}
          />
        </div>
        <div className="w-full flex items-center gap-5">
          <RHFDatePicker
            name="startDate"
            placeholder="تاریخ شروع را وارد کنید"
            rules={{ required: "تاریخ شروع الزامی است." }}
          />
          <RHFDatePicker
            name="endDate"
            placeholder="تاریخ پایان را وارد کنید"
            rules={{ required: "تاریخ پایان الزامی است." }}
          />
        </div>
        <RHFInput
          name="note"
          placeholder="اگر توضیح خاصی مد نظرتان هست اینجا بنویسید."
        />
        <div className="w-full flex justify-end">
          <Button
            type="primary"
            color="blue"
            disabled={!isValid}
            htmlType="submit"
          >
            ثبت
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddReservationForm;
