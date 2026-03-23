"use client";
import React, { useState } from "react";
import { Button, Popconfirm } from "antd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Hotel } from "../types/hotel.types";
import { FaBars } from "react-icons/fa6";
import HotelMoreInformationModal from "./HotelMoreInformationModal";
import { useRemoveHotelMutation } from "@/entities/Hotel/services/hotel.service";
import { toast } from "react-toastify";
import UpdateHotelModal from "./UpdateHotelModal";

function HotelRowActions({ row }: { row: Hotel }) {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [removeHotel] = useRemoveHotelMutation();

  const handleRemoveHotel = async () => {
    try {
      await removeHotel(row.slug).unwrap();
      toast.success("هتل با موفقیت حذف شد.");
    } catch {
      toast.error("در حذف هتل مشکلی وجود دارد.");
    }
  };

  return (
    <div className="flex items-center gap-3.5">
      <Button
        size="middle"
        type="text"
        icon={<FaBars size={14} />}
        onClick={() => setOpen(() => true)}
      />
      <Button
        size="middle"
        type="text"
        color="blue"
        icon={<FaEdit size={18} />}
        onClick={() => setOpenEdit(() => true)}
      />
      <Popconfirm
        title="آیا مطمئن هستید؟"
        description="این عمل بازگشت ناپذیر خواهد بود و تمامی موارد مرتبط حذف خواهند شد."
        okType="danger"
        okText="حذف"
        cancelText="انصراف"
        onConfirm={handleRemoveHotel}
      >
        <Button
          danger
          size="middle"
          type="text"
          icon={<FaTrashAlt size={18} />}
        />
      </Popconfirm>
      <UpdateHotelModal open={openEdit} setOpen={setOpenEdit} row={row} />
      <HotelMoreInformationModal open={open} setOpen={setOpen} record={row} />
    </div>
  );
}

export default HotelRowActions;
