"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "antd";
import AddReservationForm from "./AddReservationForm";

interface AddReservationModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function AddReservationModal({ open, setOpen }: AddReservationModalProps) {
  return (
    <Modal
      title="ایجاد رزرو"
      open={open}
      onCancel={() => setOpen(() => false)}
      footer={null}
      width={1000}
    >
      <AddReservationForm />
    </Modal>
  );
}

export default AddReservationModal;
