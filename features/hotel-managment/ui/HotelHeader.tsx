"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import AddHotelModal from "./AddHotelModal";

function HotelHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div className="hotel-management__header w-full flex items-center justify-between">
      <h1 className="text-xl font-bold">مدیریت هتل ها</h1>
      <Button onClick={() => setOpen(() => true)} type="primary" color="blue">
        افزودن هتل جدید
      </Button>
      <AddHotelModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default HotelHeader;
