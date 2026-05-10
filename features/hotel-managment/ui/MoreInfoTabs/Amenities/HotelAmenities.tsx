import {
  useDeleteHotelAmenityMutation,
  useGetHotelAmenitiesQuery,
} from "@/entities/Hotel/services/hotel.service";
import { Button, Popconfirm, Table, Tag } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import AddHotelAmenitiesModal from "./AddHotelAmenitiesModal";

interface HotelAmenitiesProps {
  id: number;
}

function HotelAmenities({ id }: HotelAmenitiesProps) {
  const [isAddModalOpen, setOpen] = useState<boolean>(false);
  const [deleteHotelAmenity] = useDeleteHotelAmenityMutation();

  const handleDeleteHotelAmenity = useCallback(
    async (amenityId: number) => {
      try {
        await deleteHotelAmenity({ hotelId: id, amenityId }).unwrap();
        toast.success("امکانات هتل با موفقیت حذف شد");
      } catch {
        toast.error("در حذف امکانات هتل مشکلی وجود دارد");
      }
    },
    [deleteHotelAmenity, id],
  );

  const hotelAmenitiesColumns = useMemo(
    () => [
      {
        key: "title",
        title: "عنوان",
        dataIndex: "title",
      },

      {
        key: "isActive",
        title: "وضعیت",
        dataIndex: "isActive",
        render: (_: unknown, record: { isActive: boolean }) => (
          <>
            <Tag color={record.isActive ? "green" : "red"}>
              {record.isActive ? "فعال" : "غیرفعال"}
            </Tag>
          </>
        ),
      },

      {
        key: "description",
        dataIndex: "description",
        title: "توضیحات",
      },

      {
        key: "operations",
        title: "عملیات پیشرفته",
        render: (_: unknown, record: { id: number }) => (
          <Popconfirm
            title="آیا مطمئن هستید؟"
            description="این عمل برگشت ناپذیر خواهد بود"
            placement="bottom"
            okText="حذف"
            cancelText="انصراف"
            okType="danger"
            onConfirm={() => handleDeleteHotelAmenity(record.id)}
          >
            <Button type="link" danger icon={<MdDeleteOutline size={18} />} />
          </Popconfirm>
        ),
      },
    ],
    [handleDeleteHotelAmenity],
  );

  const { data: hotelAmenities } = useGetHotelAmenitiesQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  const hotelAmenitiesList = hotelAmenities?.data.amenities || [];
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex justify-end">
        <Button type="text" onClick={() => setOpen(() => true)}>
          <FaCirclePlus />
        </Button>
      </div>
      <Table
        columns={hotelAmenitiesColumns}
        dataSource={hotelAmenitiesList}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        rowKey="id"
        bordered
        className="w-full"
      />
      <AddHotelAmenitiesModal
        open={isAddModalOpen}
        setOpen={setOpen}
        hotelId={id}
      />
    </div>
  );
}

export default HotelAmenities;
