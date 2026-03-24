import React, { Dispatch, SetStateAction } from "react";
import { Room } from "../../types/room.types";
import { Modal } from "antd";
import RoomGeneral from "./RoomGeneral";

interface RoomGeneralModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  room: Room;
}

function RoomGeneralModal({ open, setOpen, room }: RoomGeneralModalProps) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(() => false)}
      title={`${room?.name}`}
      footer={null}
      width={1000}
    >
      <RoomGeneral room={room} />
    </Modal>
  );
}

export default RoomGeneralModal;
