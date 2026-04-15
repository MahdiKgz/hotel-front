import { useGetHotelAmenitiesQuery } from "@/entities/Hotel/services/hotel.service";
import { Button, Table, Tag } from "antd";
import React, { useMemo, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import AddHotelAmenitiesModal from "./AddHotelAmenitiesModal";

interface HotelAmenitiesProps {
  id: number;
}

function HotelAmenities({ id }: HotelAmenitiesProps) {
  const [isAddModalOpen, setOpen] = useState<boolean>(false);
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
        render: (_: unknown, record: any) => (
          <Button
            onClick={() => {
              console.log("hotelId ", id, "amenity id", record.id);
            }}
          >
            id
          </Button>
        ),
      },
    ],
    [id],
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
