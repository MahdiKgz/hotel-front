import React, { useState } from "react";
import { Reserve } from "@/features/hotel-managment/types/hotel.types";
import { Button, Popconfirm } from "antd";
import { FaBan, FaBars } from "react-icons/fa";
import ReserveInfoModal from "./ReserveInfoModal";

interface ReservesRowActionsProps {
  row: Reserve;
  id: number;
}

function ReservesRowActions({ row, id }: ReservesRowActionsProps) {
  const [openInformation, setOpenInformation] = useState(false);

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
        onConfirm={() => console.log("cancel reserve for id ", id)}
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
