"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Hotel } from "@/features/hotel-managment/types/hotel.types";
import { Modal, Tabs } from "antd";
import type { TabsProps } from "antd";
import General from "@/features/hotel-managment/ui/General";

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
      children: <div />,
    },
    {
      key: "amenities",
      label: "امکانات",
      children: <div />,
    },
    {
      key: "reservations",
      label: "رزروها",
      children: <div />,
    },
    {
      key: "reviews",
      label: "تصاویر",
      children: <div>dummy</div>,
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
