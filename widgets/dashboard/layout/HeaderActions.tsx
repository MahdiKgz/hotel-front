"use client";
import React, { useState } from "react";
import { Button, Drawer, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearUserProfile } from "@/entities/User/slices/Profile.slice";
import { toast } from "react-toastify";
import { RiLogoutBoxRLine, RiMenu2Line } from "react-icons/ri";
import Link from "next/link";
import { RootState } from "@/shared/configs/store";
import { usePathname } from "next/navigation";
import { adminSidebar, guestSidebar } from "@/constants/sidebar.constant";

function HeaderActions() {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { role } = useSelector((state: RootState) => state.profile);
  const pathname = usePathname();

  const sidebarData = role === "ADMIN" ? adminSidebar : guestSidebar;

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
        classNames={{ root: "block md:hidden!" }}
      >
        <ul className="w-full flex flex-col items-start gap-3">
          {sidebarData.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link key={link.url} href={link.url} className="w-full">
                <li
                  className={`
                          w-full py-3 px-2.5 flex items-center gap-2.5 rounded text-sm transition-all duration-300 font-medium
                          ${
                            isActive
                              ? "bg-sky-600 text-white shadow-md"
                              : "hover:bg-sky-600 hover:text-white text-gray-700"
                          }
                        `}
                >
                  {link.icon}
                  {link.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </Drawer>
    </div>
  );
}

export default HeaderActions;
