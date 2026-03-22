"use client";
import React from "react";
import { RHFInput } from "@/shared/ui/RHFInput";
import { FormProvider } from "react-hook-form";
import useAddHotel from "../hooks/useAddHotel";
import { Button, Spin } from "antd";
import RHFSelect from "@/shared/ui/RHFSelect";
import {
  useGetCitiesQuery,
  useGetManagersQuery,
} from "@/entities/Domain/services/domain.service";
import { METRO_ACCESS, STARS_COUNT } from "@/constants/hotel.constant";

function AddHotelForm() {
  const { methods, handleSubmit, onSubmit, isValid, isSubmittingForm } =
    useAddHotel();

  const { data: managersResponse } = useGetManagersQuery("", {
    refetchOnFocus: true,
  });

  const { data: citiesResponse } = useGetCitiesQuery("", {
    refetchOnFocus: true,
  });

  const managersSelectOptions = managersResponse?.data.managersOptions;

  const citiesSelectOptions = citiesResponse?.data.provincesOptions;

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
            rules={{ required: "نام هتل الزامی است." }}
          />
          <RHFInput
            name="slug"
            size="middle"
            placeholder="اسم اختصاری را وارد کنید"
            rules={{ required: "اسم اختصاری الزامی است." }}
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFSelect
            name="country"
            placeholder="کشور را انتخاب کنید"
            options={[{ value: 1, label: "ایران" }]}
            rules={{ required: "کشور الزامی است." }}
          />
          <RHFSelect
            name="city"
            placeholder="شهر را انتخاب کنید"
            options={citiesSelectOptions}
            rules={{ required: "شهر الزامی است." }}
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFInput
            name="address"
            size="middle"
            placeholder="آدرس هتل را وارد کنید"
            rules={{ required: "آدرس الزامی است." }}
          />
          <RHFInput
            name="postalCode"
            size="middle"
            placeholder="کدپستی هتل را وارد کنید"
            rules={{ required: "کد پستی الزامی است." }}
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFSelect
            name="stars"
            placeholder="تعداد ستاره های هتل را انتخاب کنید"
            options={STARS_COUNT}
            rules={{ required: "تعداد ستاره الزامی است." }}
          />
          <RHFSelect
            name="metroAccess"
            placeholder="دسترسی به مترو را انتخاب کنید"
            options={METRO_ACCESS}
            rules={{ required: "دسترسی به مترو الزامی است" }}
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFSelect
            name="manager_id"
            placeholder="مسئول هتل را انتخاب کنید"
            options={managersSelectOptions}
          />
        </div>

        <RHFInput
          name="description"
          size="middle"
          placeholder="کوتاه درباره هتل بنویسید"
          isTextArea
        />
        <div className="w-full flex justify-end">
          <Button
            disabled={!isValid || isSubmittingForm}
            type="primary"
            color="blue"
            htmlType="submit"
            size="middle"
          >
            {isSubmittingForm ? (
              <>
                <Spin /> در حال ثبت
              </>
            ) : (
              "ثبت"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddHotelForm;
