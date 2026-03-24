import { Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { Room } from "../../types/room.types";
import AddOrEditRoomForm from "./AddOrEditRoomForm";

interface AddOrEditRoomModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  room: Room | null;
  hotelId: number;
}

function AddOrEditRoomModal({
  open,
  setOpen,
  room,
  hotelId,
}: AddOrEditRoomModalProps) {
  return (
    <Modal
      title={room !== null ? "ویرایش اتاق" : "افزودن اتاق"}
      open={open}
      onCancel={() => setOpen(() => false)}
      footer={null}
      width={1000}
    >
      <AddOrEditRoomForm room={room} hotelId={hotelId} />
    </Modal>
  );
}

export default AddOrEditRoomModal;
