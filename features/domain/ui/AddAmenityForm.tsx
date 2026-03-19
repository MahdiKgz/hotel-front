"use client";
import React from "react";
import { RHFInput } from "@/shared/ui/RHFInput";
import { FormProvider } from "react-hook-form";
import useAddOrEditDomain from "../hooks/useAddDomain";
import { Button, Switch } from "antd";
import RHFSwitch from "@/shared/ui/RHFSwitch";

function AddAmenityForm() {
  const { methods, handleSubmit, onSubmit } = useAddOrEditDomain(null);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-4"
      >
        <div className="w-full flex items-center">
          <RHFInput
            name="title"
            placeholder="عنوان امکانات را وارد کنید."
            icon={null}
            rules={{ required: "عنوان الزامی است" }}
            size="middle"
            className="w-3/4!"
          />
          <RHFSwitch
            name="isActive"
            label="وضعیت فعال بودن"
            className="w-1/4!"
            rules={{ required: "وضعیت فعال بودن را مشخص کنید" }}
          />
        </div>
        <RHFInput
          name="description"
          placeholder="توضیحات امکانات را وارد کنید"
          isTextArea
          size="middle"
        />
        <div className="w-full flex justify-end">
          <Button type="primary" color="blue" htmlType="submit">
            افزودن
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddAmenityForm;
