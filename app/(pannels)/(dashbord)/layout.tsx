"use client";

import WithAuth from "@/shared/configs/WithAuth";
import HeaderActions from "@/widgets/dashboard/layout/HeaderActions";
import Sidebar from "@/widgets/dashboard/layout/Sidebar";
import UserAvatar from "@/widgets/dashboard/layout/UserAvatar";
import { LuLayoutDashboard } from "react-icons/lu";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-main-area">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar-title">
            <span><LuLayoutDashboard /></span>
            <div>
              <strong>پنل کاربری هُما</strong>
              <small>مدیریت رزروها و خدمات سفر</small>
            </div>
          </div>
          <div className="dashboard-account-area">
            <UserAvatar />
            <HeaderActions />
          </div>
        </header>
        <div className="dashboard-scroll-area">
          <section className="dashboard-canvas">{children}</section>
        </div>
      </div>
    </div>
  );
}

export default WithAuth(DashboardLayout);
