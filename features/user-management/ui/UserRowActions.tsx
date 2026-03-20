"use client";
import React, { useState } from "react";
import { Button, Popconfirm } from "antd";
import { FaBan } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import UserInformationModal from "./UserInformationModal";

function UserRowActions({ id }: { id: number }) {
  const [open, setOpen] = useState<boolean>(false);

  if (!id) return;
  return (
    <div className="flex items-center flex-wrap gap-2">
      <Popconfirm
        title="آیا مطمئن هستید؟"
        description="با این عمل کاربر از دسترسی به خدمات محروم خواهد شد؟"
        okText="تایید"
        cancelText="انصراف"
        okType="danger"
        onConfirm={() => console.log(`banned user ${id}`)}
      >
        <Button danger type="text" title="بن کردن کاربر">
          <FaBan size={14} />
        </Button>
      </Popconfirm>
      <Button onClick={() => setOpen(() => true)} type="text" color="geekblue">
        <FaBars size={14} />
      </Button>
      <UserInformationModal id={id} open={open} setOpen={setOpen} />
    </div>
  );
}

export default UserRowActions;
