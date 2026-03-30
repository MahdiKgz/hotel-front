import React, { useState } from "react";
import { Reserve } from "@/features/hotel-managment/types/hotel.types";
import { Button, Popconfirm } from "antd";
import { FaBan, FaBars } from "react-icons/fa";
import ReserveInfoModal from "./ReserveInfoModal";
import { useCancelReserveMutation } from "@/entities/Hotel/services/hotel.service";
import { toast } from "react-toastify";

interface ReservesRowActionsProps {
  row: Reserve;
}

function ReservesRowActions({ row }: ReservesRowActionsProps) {
  const [openInformation, setOpenInformation] = useState(false);

  const [cancelReserve] = useCancelReserveMutation();

  const handleCancelReserve = async () => {
    try {
      await cancelReserve(row.roomId).unwrap();
      toast.success("رزرو اتاق لغو شد.");
    } catch {
      toast.error("در لغو رزرو مشکلی وجود دارد.");
    }
  };
  return (
    <div className="flex items-center gap-2.5">
      <Button type="text" onClick={() => setOpenInformation(() => true)}>
        <FaBars size={14} />
      </Button>
      <Popconfirm
        title="آیا مطمئن هستید؟"
        description="با این عمل رزرو لغو خواهد شد."
        okType="danger"
        okText="لغو"
        cancelText="انصراف"
        onConfirm={handleCancelReserve}
      >
        <Button danger type="text">
          <FaBan size={14} />
        </Button>
      </Popconfirm>

      <ReserveInfoModal
        open={openInformation}
        setOpen={setOpenInformation}
        reserve={row}
      />
    </div>
  );
}

export default ReservesRowActions;
