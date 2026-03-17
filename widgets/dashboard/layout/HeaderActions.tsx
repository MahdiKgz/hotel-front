"use client";
import React, { useState } from "react";
import { Button, Drawer, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { clearUserProfile } from "@/entities/User/slices/Profile.slice";
import { toast } from "react-toastify";
import { RiLogoutBoxRLine, RiMenu2Line } from "react-icons/ri";

function HeaderActions() {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleConfirmLogout = () => {
    dispatch(clearUserProfile());
    sessionStorage.removeItem("authToken");
    toast.success("از حساب خارج شدید.");
    window.location.href = "/login";
  };
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="text"
        color="default"
        className="block md:hidden!"
        onClick={() => setOpen(() => true)}
      >
        <RiMenu2Line />
      </Button>
      <Popconfirm
        title="آیا مطمئن هستید؟"
        description="با این عمل از حساب کاربری خود خارج خواهید شد."
        onConfirm={handleConfirmLogout}
        okText="خروج"
        cancelText="انصراف"
        okType="danger"
      >
        <Button variant="text" color="danger" className="rotate-180">
          <RiLogoutBoxRLine />
        </Button>
      </Popconfirm>
      <Drawer
        open={open}
        onClose={() => setOpen(() => false)}
        size={256}
        title="دسترسی سریع"
      />
    </div>
  );
}

export default HeaderActions;
