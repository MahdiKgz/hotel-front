"use client";
import React, { useMemo, useState } from "react";
import { useGetRoomsQuery } from "@/entities/Hotel/services/hotel.service";
import { Button, Table, Tag } from "antd";
import { FaPlusCircle } from "react-icons/fa";
import AddOrEditRoomModal from "./AddOrEditRoomModal";
import { Room } from "../../types/room.types";
import RoomsRowActions from "../RoomsRowActions";

function Rooms({ id }: { id: number }) {
  const [open, setOpen] = useState<boolean>(false);

  const { data: roomsResponse } = useGetRoomsQuery(id, {
    refetchOnFocus: true,
  });

  const rooms = roomsResponse?.data.rooms;

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
          <RoomsRowActions record={record} />
        ),
      },
    ],
    [],
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
