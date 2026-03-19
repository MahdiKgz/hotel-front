import React from "react";
import { useGetAmenitiesQuery } from "@/entities/Domain/services/domain.service";
import { Button, Popconfirm, Table, Tag } from "antd";

function DomainSubtable() {
  const columns = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: "33.33%",
    },
    {
      title: "وضعیت",
      dataIndex: "isActive",
      key: "isActive",
      width: "33.33%",
      render: (_: unknown, { isActive }: { isActive: boolean }) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "فعال" : "غیرفعال"}
        </Tag>
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
            onClick={() => console.log(record)}
          >
            ویرایش
          </button>
          <Popconfirm
            title="آیا مطمئن هستید؟"
            description="این عمل برگشت ناپذیر خواهد بود"
            placement="bottom"
            okText="حذف"
            cancelText="انصراف"
            okType="danger"
          >
            <Button type="link" variant="outlined" danger>
              حذف
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const { data } = useGetAmenitiesQuery("", { refetchOnFocus: true });

  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.data.amenities}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        rowKey="id"
        className="w-full"
      />
    </>
  );
}

export default DomainSubtable;
