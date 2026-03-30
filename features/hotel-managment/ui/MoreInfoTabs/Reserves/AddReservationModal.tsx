"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "antd";
import AddReservationForm from "./AddReservationForm";

interface AddReservationModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  hotelId: number;
}

function AddReservationModal({
  open,
  setOpen,
  hotelId,
}: AddReservationModalProps) {
  return (
    <Modal
      title="ایجاد رزرو"
      open={open}
      onCancel={() => setOpen(() => false)}
      footer={null}
      width={1000}
    >
      <AddReservationForm hotelId={hotelId} />
    </Modal>
  );
}

export default AddReservationModal;
