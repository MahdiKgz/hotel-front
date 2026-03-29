"use client";
import React from "react";
import { Alert, Modal } from "antd";
import { AddHotelModalProps } from "../types/hotel.types";
import AddHotelForm from "./AddHotelForm";
import { IoInformation } from "react-icons/io5";

function AddHotelModal({ open, setOpen }: AddHotelModalProps) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(() => false)}
      title="افزودن هتل جدید"
      footer={null}
      width={1000}
    >
      <Alert
        title="با انتخاب نکردن مدیر هتل ؛ شما هتل را عهده دار خواهید بود."
        className="my-4! rounded!"
        type="warning"
        banner
      />
      <AddHotelForm />
    </Modal>
  );
}

export default AddHotelModal;
