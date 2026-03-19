"use client";
import React, { useState } from "react";
import { Table, Tag } from "antd";
import DomainSubtableModal from "./DomainSubtableModal";

function DomainTable() {
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: "33.33%",
    },
    {
      title: "فعالیت",
      dataIndex: "isActive",
      key: "isActive",
      width: "33.33%",
      render: (_: unknown, { isActive = true }: { isActive: boolean }) => (
        <>
          <Tag color={isActive ? "green" : "red"}>
            {isActive ? "فعال" : "غیرفعال"}
          </Tag>
        </>
      ),
    },
    {
      title: "عملیات",
      key: "actions",
      width: "33.33%",
      render: (_, record) => (
        <span className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => setOpen(() => true)}
          >
            مشاهده
          </button>
        </span>
      ),
    },
  ];

  const data = [
    {
      id: "features",
      title: "امکانات",
      isActive: true,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: "max-content" }}
        rowKey="id"
        className="w-full"
      />

      <DomainSubtableModal open={open} setOpen={setOpen} />
    </>
  );
}

export default DomainTable;
