"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  useDeleteRoomMutation,
  useGetRoomsQuery,
} from "@/entities/Hotel/services/hotel.service";
import { Button, Popconfirm, Table, Tag } from "antd";
import { FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";
import AddOrEditRoomModal from "./AddOrEditRoomModal";
import { Room } from "../../types/room.types";
import { toast } from "react-toastify";

function Rooms({ id }: { id: number }) {
  const [open, setOpen] = useState<boolean>(false);

  const { data: roomsResponse } = useGetRoomsQuery(id, {
    refetchOnFocus: true,
  });

  const rooms = roomsResponse?.data.rooms;

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

  const columns = useMemo(
    () => [
      { key: "name", dataIndex: "name", title: "عنوان" },
      { key: "slug", dataIndex: "slug", title: "علامت اختصاری" },
      { key: "capacity", dataIndex: "capacity", title: "ظرفیت (نفر)" },
      {
        key: "status",
        dataIndex: "status",
        title: "وضعیت",
        render: (_: unknown, record) => (
          <>
            {record.status === "RESERVED" ? (
              <Tag color="red">رزرو شده</Tag>
            ) : record.status === "MAINTAIN" ? (
              <Tag color="cyan">در حال تعمیر</Tag>
            ) : (
              <Tag color="blue">قابل رزرو</Tag>
            )}
          </>
        ),
      },
      {
        key: "operations",
        title: "عملیات",
        render: (_: unknown, record: Room) => (
          <>
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
          </>
        ),
      },
    ],
    [handleRemoveRoom],
  );
  return (
    <>
      <div className="w-full flex justify-end">
        <Button type="text" onClick={() => setOpen(() => true)}>
          <FaPlusCircle size={14} />
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={rooms}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        rowKey="id"
        className="w-full"
      />

      <AddOrEditRoomModal
        open={open}
        setOpen={setOpen}
        hotelId={id}
        room={null}
      />
    </>
  );
}

export default Rooms;
