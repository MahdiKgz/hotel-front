import { RHFInput } from "@/shared/ui/RHFInput";
import React from "react";
import GeometryMap from "./GeometryMap";
import { Button } from "antd";
import useCreateGeometry from "@/features/hotel-managment/hooks/useCreateGeometry";
import { FormProvider } from "react-hook-form";

function GeometryForm({ hotelId }: { hotelId: number }) {
  const { methods, handleSubmit, onSubmit, isValid } =
    useCreateGeometry(hotelId);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-4"
      >
        <div className="w-full flex items-start gap-4">
          <RHFInput
            placeholder="عرض جغرافیایی را وارد کنید"
            name="lat"
            rules={{ required: "عرض جغرافیایی الزامی است." }}
            disabled={true}
          />
          <RHFInput
            placeholder="طول جغرافیایی را وارد کنید"
            name="lng"
            rules={{ required: "طول جغرافیایی الزامی است." }}
            disabled={true}
          />
        </div>
        <GeometryMap />
        <div className="w-full flex justify-end">
          <Button
            type="primary"
            color="blue"
            htmlType="submit"
            size="large"
            disabled={!isValid}
          >
            ثبت
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default GeometryForm;
