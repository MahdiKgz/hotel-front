"use client";
import React from "react";
import useAddReserve from "@/features/hotel-managment/hooks/useAddReserve";
import { FormProvider } from "react-hook-form";
import RHFSelect from "@/shared/ui/RHFSelect";
import RHFDatePicker from "@/shared/ui/RHFDatePicker";
import { RHFInput } from "@/shared/ui/RHFInput";
import { Button } from "antd";
import { useGetRoomsQuery } from "@/entities/Hotel/services/hotel.service";
import { Room } from "@/features/hotel-managment/types/room.types";

function AddReservationForm({ hotelId }: { hotelId: number }) {
  const { methods, handleSubmit, isValid, onSubmit } = useAddReserve(hotelId);

  const { data: roomsResponse } = useGetRoomsQuery(hotelId, {
    refetchOnFocus: true,
  });

  const roomsOptions = roomsResponse?.data.rooms.map(
    (room: Room & { id: number }) => {
      if (room.status === "EMPTY") {
        return {
          value: room.id,
          label: room.name,
        };
      } else return {};
    },
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-3.5 my-6"
      >
        <div className="w-full flex items-center gap-5">
          <RHFSelect
            placeholder="اتاق را انتخاب کنید"
            name="roomId"
            rules={{ required: "اتاق را وارد کنید" }}
            options={roomsOptions}
          />
          <RHFDatePicker
            name="startDate"
            placeholder="تاریخ شروع را وارد کنید"
            rules={{ required: "تاریخ شروع الزامی است." }}
          />
        </div>
        <div className="w-full flex items-center gap-5">
          <RHFDatePicker
            name="endDate"
            placeholder="تاریخ پایان را وارد کنید"
            rules={{ required: "تاریخ پایان الزامی است." }}
          />
        </div>
        <RHFInput
          name="note"
          placeholder="اگر توضیح خاصی مد نظرتان هست اینجا بنویسید."
          isTextArea
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
