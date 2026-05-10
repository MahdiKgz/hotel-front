"use client";
import React from "react";
import AdminReports from "@/features/report/Admin/AdminReports";
import { RootState } from "@/shared/configs/store";
import { useSelector } from "react-redux";

function DashboardMain() {
  const { role } = useSelector((state: RootState) => state.profile);
  return <div className="w-full">{role === "ADMIN" && <AdminReports />}</div>;
}

export default DashboardMain;
