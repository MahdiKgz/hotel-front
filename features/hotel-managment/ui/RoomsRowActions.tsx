import { Button, Popconfirm } from "antd";
import React, { useCallback, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Room } from "../types/room.types";
import {
  useDeleteRoomMutation,
  useGetOneRoomQuery,
} from "@/entities/Hotel/services/hotel.service";
import { toast } from "react-toastify";
import AddOrEditRoomModal from "./MoreInfoTabs/AddOrEditRoomModal";
import RoomGeneralModal from "./MoreInfoTabs/RoomGeneralModal";
import { FaBars } from "react-icons/fa6";

function RoomsRowActions({ record }: { record: Room }) {
  const [open, setOpen] = useState(false);
  const [openGeneral, setOpenGeneral] = useState(false);
  const [deleteRoom] = useDeleteRoomMutation();

  const handleRemoveRoom = useCallback(
    async (slug: string) => {
      try {
        await deleteRoom(slug).unwrap();
        toast.success("اتاق با موفقیت حذف شد");
      } catch (err) {
        if (err.data.message === "room NOT found !!") {
          toast.error("اتاق پیدا نشد.");
          return;
        }
        toast.error("در حذف اتاق مشکلی به وجود آمد");
      }
    },
    [deleteRoom],
  );

  const { data: oneRoomResponse } = useGetOneRoomQuery(record.slug, {
    refetchOnFocus: true,
    skip: !open && !openGeneral,
  });

  const room = oneRoomResponse?.data.room;

  return (
    <>
      <Button type="text" onClick={() => setOpenGeneral(() => true)}>
        <FaBars size={18} />
      </Button>
      <Button type="text" onClick={() => setOpen(() => true)}>
        <FaRegEdit size={18} />
      </Button>
      <Popconfirm
        title="آیا مطمئن هستید؟"
        description="این عمل بازگشت پذیر نیست."
        okType="danger"
        okText="حذف"
        cancelText="انصراف"
        onConfirm={() => handleRemoveRoom(record.slug)}
      >
        <Button type="text" danger>
          <FaRegTrashAlt size={18} />
        </Button>
      </Popconfirm>

      <AddOrEditRoomModal
        open={open}
        setOpen={setOpen}
        hotelId={room?.hotel_id}
        room={room}
      />

      <RoomGeneralModal
        open={openGeneral}
        setOpen={setOpenGeneral}
        room={room}
      />
    </>
  );
}

export default RoomsRowActions;
