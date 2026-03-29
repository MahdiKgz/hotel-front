"use client";
import React, { useMemo, useState } from "react";
import { Button, Table } from "antd";
import { FaPlusCircle } from "react-icons/fa";
import ReservesRowActions from "./ReservesRowActions";
import { Reserve } from "@/features/hotel-managment/types/hotel.types";

function Reserves({ id }: { id: number }) {
  const [open, setOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        key: "title",
        dataIndex: "title",
        title: "نام اتاق",
        render: (_: unknown, { room }) => <>{room.name}</>,
      },
      {
        key: "startDate",
        dataIndex: "startDate",
        title: "تاریخ شروع",
        render: (_: unknown, { startDate }) => (
          <>{new Date(startDate).toLocaleDateString("fa-IR")}</>
        ),
      },
      {
        key: "endDate",
        dataIndex: "endDate",
        title: "تاریخ پایان",
        render: (_: unknown, { endDate }) => (
          <>{new Date(endDate).toLocaleDateString("fa-IR")}</>
        ),
      },
      {
        key: "operations",
        title: "عملیات",
        render: (_: unknown, record: Reserve) => (
          <ReservesRowActions row={record} id={id} />
        ),
      },
    ],
    [id],
  );
  return (
    <div className="w-full flex flex-col items-start gap-2">
      <div className="w-full flex justify-end">
        <Button type="text" onClick={() => setOpen(() => true)}>
          <FaPlusCircle size={14} />
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={[
          {
            hotelId: 1,
            userId: 1,
            roomId: 1,
            startDate: "2026-03-30",
            endDate: "2026-04-02",
            note: "تمایل به اتاق با ویترین دریا داریم",
            createdAt: "2026-03-29T16:13:16.000Z",
            updatedAt: "2026-03-29T16:13:16.000Z",
            room: {
              id: 1,
              name: "اتاق ماه عسل",
              slug: "honey-moon",
            },
            user: {
              id: 1,
              fullName: "Mahdi khoshghadamzadeh",
              phone: "09388228174",
              avatar: null,
            },
            hotel: {
              id: 1,
              name: "اسپیناس پالاس",
              slug: "espinas-palace",
              cover: null,
            },
          },
        ]}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        rowKey="id"
        bordered
        className="w-full"
      />
    </div>
  );
}

export default Reserves;
