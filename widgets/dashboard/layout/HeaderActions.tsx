"use client";

import { useState } from "react";
import { Button, Drawer, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearUserProfile } from "@/entities/User/slices/Profile.slice";
import { toast } from "react-toastify";
import { RiLogoutBoxRLine, RiMenu2Line } from "react-icons/ri";
import Link from "next/link";
import { RootState } from "@/shared/configs/store";
import { usePathname } from "next/navigation";
import { adminSidebar, guestSidebar } from "@/constants/sidebar.constant";
import { LuPlane } from "react-icons/lu";

export default function HeaderActions() {
  const [open, setOpen] = useState(false);
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
    <div className="dashboard-header-actions">
      <Button
        type="text"
        className="dashboard-menu-trigger"
        onClick={() => setOpen(true)}
        aria-label="باز کردن منوی پنل"
      >
        <RiMenu2Line />
      </Button>
      <Popconfirm
        title="از حساب خارج می‌شوید؟"
        description="برای ورود دوباره به شماره تلفن و رمز عبور نیاز دارید."
        onConfirm={handleConfirmLogout}
        okText="خروج"
        cancelText="انصراف"
        okType="danger"
      >
        <Button type="text" danger className="dashboard-logout" aria-label="خروج از حساب">
          <RiLogoutBoxRLine />
        </Button>
      </Popconfirm>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size={280}
        placement="right"
        title={
          <span className="drawer-brand"><span><LuPlane /></span><strong>هُما</strong></span>
        }
        className="dashboard-mobile-drawer"
      >
        <nav className="mobile-sidebar-nav" aria-label="دسترسی‌های پنل موبایل">
          {sidebarData.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.url}
                href={link.url}
                className={isActive ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                <span>{link.icon}</span>{link.label}
              </Link>
            );
          })}
        </nav>
      </Drawer>
    </div>
  );
}
