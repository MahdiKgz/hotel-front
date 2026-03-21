"use client";
import React from "react";
import { Modal } from "antd";
import { AddHotelModalProps } from "../types/hotel.types";
import AddHotelForm from "./AddHotelForm";

function AddHotelModal({ open, setOpen }: AddHotelModalProps) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(() => false)}
      title="افزودن هتل جدید"
      footer={null}
      width={1000}
    >
      <AddHotelForm />
    </Modal>
  );
}

export default AddHotelModal;
