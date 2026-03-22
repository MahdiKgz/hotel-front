"use client";
import React, { useMemo } from "react";
import { Table } from "antd";
import { useGetAllHotelsQuery } from "@/entities/Hotel/services/hotel.service";
import { Hotel } from "../types/hotel.types";
import HotelRowActions from "./HotelRowActions";

function HotelsTable() {
  const { data: allHotels } = useGetAllHotelsQuery("", {
    refetchOnFocus: true,
  });

  const columns = useMemo(
    () => [
      {
        title: "نام",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "علامت اختصاری",
        dataIndex: "slug",
        key: "slug",
      },
      {
        title: "ستاره",
        dataIndex: "stars",
        key: "stars",
      },
      {
        title: "عملیات",
        key: "operations",
        render: (_: unknown, record: Hotel) => <HotelRowActions row={record} />,
      },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      dataSource={allHotels?.data.hotels}
      pagination={{ pageSize: 10 }}
      scroll={{ x: "max-content" }}
      rowKey="id"
      className="w-full"
    />
  );
}

export default HotelsTable;
