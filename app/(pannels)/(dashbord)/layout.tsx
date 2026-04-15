"use client";
import WithAuth from "@/shared/configs/WithAuth";
import HeaderActions from "@/widgets/dashboard/layout/HeaderActions";
import Sidebar from "@/widgets/dashboard/layout/Sidebar";
import UserAvatar from "@/widgets/dashboard/layout/UserAvatar";
import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-mist-100">
      <div className="dashboard-header container fixed top-5 inset-x-0 p-4 border-2 border-dashed rounded border-mist-600/40 flex items-center justify-between">
        <div className="dashboard-header__right flex items-center gap-2.5">
          <UserAvatar />
        </div>
        <div className="dashboard-header__left">
          <HeaderActions />
        </div>
      </div>
      <div className="dashboard-content container fixed top-28 inset-x-0 flex items-start gap-6">
        <Sidebar />
        <div className="w-full h-[85vh] border-2 border-dashed border-mist-600/40 rounded p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default WithAuth(DashboardLayout);
