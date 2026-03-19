import React from "react";
import {
  useGetAmenitiesQuery,
  useRemoveAmenityMutation,
} from "@/entities/Domain/services/domain.service";
import { Button, Popconfirm, Table, Tag } from "antd";
import { initialValuesType } from "./AddOrEditDomainForm";
import { toast } from "react-toastify";

function DomainSubtable({
  onSelect,
}: {
  onSelect: (value: initialValuesType) => void;
}) {
  const [removeAmenity] = useRemoveAmenityMutation();

  const handleRemoveAmenity = async (id: number) => {
    try {
      await removeAmenity(id).unwrap();
      toast.success("امکانات با موفقیت حذف شد");
    } catch {
      toast.error("در حذف امکانات مشکلی وجود دارد");
    }
  };

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
      render: (_: unknown, record: initialValuesType & { id: number }) => (
        <span className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => onSelect(record)}
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
            onConfirm={() => handleRemoveAmenity(record.id)}
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
