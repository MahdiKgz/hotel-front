"use client";
import React from "react";
import { Room } from "../../types/room.types";
import useAddOrEditRoom from "../../hooks/useAddOrEditRoom";
import { FormProvider } from "react-hook-form";
import { Button } from "antd";
import { RHFInput } from "@/shared/ui/RHFInput";
import RHFSelect from "@/shared/ui/RHFSelect";
import {
  BOOK_TYPE,
  GEO_DIRECTION,
  KITCHEN,
  ROOM_STATUS,
} from "@/constants/hotel.constant";

function AddOrEditRoomForm({
  room,
  hotelId,
}: {
  room: Room | null;
  hotelId: number;
}) {
  const { methods, handleSubmit, isValid, onSubmit } = useAddOrEditRoom(room);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-4 my-4"
      >
        <div className="w-full flex items-start gap-3">
          <RHFInput
            name="name"
            placeholder="نام اتاق را وارد کنید"
            size="middle"
          />
          <RHFInput
            name="slug"
            placeholder="علامت اختصاری اتاق را وارد کنید"
            size="middle"
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFInput
            name="capacity"
            placeholder="ظرفیت اتاق را به نفر وارد کنید"
            size="middle"
            type="number"
            min={1}
            max={6}
          />
          <RHFSelect
            name="status"
            placeholder="وضعیت اتاق را تعیین کنید"
            options={ROOM_STATUS}
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFInput
            name="price"
            placeholder="قیمت اتاق را به نفر وارد کنید"
            size="middle"
            type="number"
          />
          <RHFSelect
            name="bookType"
            placeholder="نوع رزرو اتاق را تعیین کنید"
            options={BOOK_TYPE}
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFInput
            name="bathService"
            placeholder="تعداد سرویس بهداشتی اتاق را وارد کنید"
            size="middle"
            type="number"
          />
          <RHFInput
            name="balcony"
            placeholder="تعداد بالکن اتاق را وارد کنید"
            size="middle"
            type="number"
          />
        </div>
        <div className="w-full flex items-start gap-3">
          <RHFSelect
            name="geoDirection"
            placeholder="جهت جغرافیایی اتاق را تعیین کنید"
            options={GEO_DIRECTION}
          />
          <RHFSelect
            name="kitchen"
            placeholder="وضیعت آشپزخانه اتاق را تعیین کنید"
            options={KITCHEN}
          />
        </div>
        <RHFInput
          name="description"
          isTextArea
          placeholder="کوتاه راجع به اتاق توضیح دهید."
        />
        <div className="w-full flex justify-end">
          <Button
            disabled={!isValid}
            htmlType="submit"
            type="primary"
            color="blue"
          >
            ثبت
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddOrEditRoomForm;
