"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Hotel } from "../types/hotel.types";
import { FaBars } from "react-icons/fa6";
import HotelMoreInformationModal from "@/features/user-management/ui/HotelMoreInformationModal";

function HotelRowActions({ row }: { row: Hotel }) {
  const [open, setOpen] = useState<boolean>(false);
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
      />
      <Button
        danger
        size="middle"
        type="text"
        icon={<FaTrashAlt size={18} />}
      />
      <HotelMoreInformationModal open={open} setOpen={setOpen} record={row} />
    </div>
  );
}

export default HotelRowActions;
