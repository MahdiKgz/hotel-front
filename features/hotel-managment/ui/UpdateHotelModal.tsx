import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "antd";
import { Hotel } from "../types/hotel.types";
import { useGetOneHotelQuery } from "@/entities/Hotel/services/hotel.service";
import UpdateHotelForm from "./UpdateHotelForm";

interface UpdateHotelModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row: Hotel | null;
}

function UpdateHotelModal({ open, setOpen, row }: UpdateHotelModalProps) {
  const { data: oneHotelResponse } = useGetOneHotelQuery(row.slug, {
    refetchOnFocus: true,
  });
  const hotel = oneHotelResponse?.data.hotel;

  return (
    <>
      <Modal
        title="ویرایش هتل"
        footer={null}
        width={1000}
        open={open}
        onCancel={() => setOpen(() => false)}
      >
        <UpdateHotelForm hotel={hotel} />
      </Modal>
    </>
  );
}

export default UpdateHotelModal;
