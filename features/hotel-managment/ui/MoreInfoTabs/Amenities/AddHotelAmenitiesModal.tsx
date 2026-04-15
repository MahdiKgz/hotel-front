import React, { Dispatch, SetStateAction } from "react";
import { Button, Modal } from "antd";
import RHFSelect from "@/shared/ui/RHFSelect";
import { FormProvider } from "react-hook-form";
import useAddAmenities from "@/features/hotel-managment/hooks/useAddAmenities";

interface AddHotelAmenitiesModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  hotelId: number;
}

function AddHotelAmenitiesModal({
  open,
  setOpen,
  hotelId,
}: AddHotelAmenitiesModalProps) {
  const { methods, handleSubmit, onSubmit, amenitiesOptions } =
    useAddAmenities(hotelId);
  return (
    <Modal
      title="افزودن امکانات"
      open={open}
      onCancel={() => setOpen(() => false)}
      footer={null}
      width={1000}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-start gap-3"
        >
          <RHFSelect
            name="amenities"
            mode="multiple"
            options={amenitiesOptions}
            rules={{ required: "حداقل یک امکان را انتخاب کنید" }}
            placeholder="امکانات هتل را انتخاب کنید"
          />
          <div className="w-full flex justify-end">
            <Button type="primary" color="blue" htmlType="submit">
              ثبت
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default AddHotelAmenitiesModal;
