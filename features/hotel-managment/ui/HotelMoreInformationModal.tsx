"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Hotel } from "@/features/hotel-managment/types/hotel.types";
import { Modal, Tabs } from "antd";
import type { TabsProps } from "antd";
import General from "./MoreInfoTabs/General";
import Rooms from "./MoreInfoTabs/Rooms";
import HotelImages from "./HotelImages";
import Reserves from "./MoreInfoTabs/Reserves/Reserves";
import RHFSelect from "@/shared/ui/RHFSelect";
import HotelAmenities from "./MoreInfoTabs/Amenities/HotelAmenities";

interface HotelMoreInformationModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  record: Hotel & { id: number };
}

function HotelMoreInformationModal({
  record,
  open,
  setOpen,
}: HotelMoreInformationModalProps) {
  const items: TabsProps["items"] = [
    {
      key: "general",
      label: "اطلاعات کلی",
      children: <General slug={record.slug} />,
    },
    {
      key: "rooms",
      label: "اتاق‌ها",
      children: <Rooms id={record.id} />,
    },
    {
      key: "amenities",
      label: "امکانات",
      children: <HotelAmenities id={record.id} />,
    },
    {
      key: "reservations",
      label: "رزروها",
      children: <Reserves id={record.id} />,
    },
    {
      key: "images",
      label: "تصاویر",
      children: <HotelImages slug={record.slug} />,
    },
    {
      key: "geom",
      label: "مختصات جغرافیایی",
      children: <div>dummy</div>,
    },
  ];

  return (
    <Modal
      title={record.name}
      open={open}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <Tabs
        defaultActiveKey="general"
        tabBarStyle={{
          gap: "16px",
        }}
        items={items}
      />
    </Modal>
  );
}

export default HotelMoreInformationModal;
