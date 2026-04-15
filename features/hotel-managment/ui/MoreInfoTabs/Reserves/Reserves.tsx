"use client";
import React, { useMemo, useState } from "react";
import { Button, Table, Tag } from "antd";
import { FaPlusCircle } from "react-icons/fa";
import ReservesRowActions from "./ReservesRowActions";
import { Reserve } from "@/features/hotel-managment/types/hotel.types";
import AddReservationModal from "./AddReservationModal";
import { useGetReservesQuery } from "@/entities/Hotel/services/hotel.service";

function Reserves({ id }: { id: number }) {
  const [open, setOpen] = useState(false);

  const { data: reservesResponse } = useGetReservesQuery(id, {
    refetchOnFocus: true,
  });

  const reserves: Reserve[] = useMemo(
    () => reservesResponse?.data?.reserves ?? [],
    [reservesResponse],
  );

  const columns = useMemo(
    () => [
      {
        key: "title",
        dataIndex: "title",
        title: "نام اتاق",
        render: (_: unknown, { room }: Reserve) => (
          <>{room?.name || <Tag color="red">ثبت نشده</Tag>}</>
        ),
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
          <ReservesRowActions row={record} />
        ),
      },
    ],
    [],
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
        dataSource={reserves}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        rowKey="id"
        bordered
        className="w-full"
      />
      <AddReservationModal open={open} setOpen={setOpen} hotelId={id} />
    </div>
  );
}

export default Reserves;
