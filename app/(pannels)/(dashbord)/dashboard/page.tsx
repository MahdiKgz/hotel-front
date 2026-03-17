"use client";
import React from "react";
import { useGetMeQuery } from "@/entities/User/services/auth.service";

function DashboardMain() {
  const { data } = useGetMeQuery();

  return <div className="">DashboardMain</div>;
}

export default DashboardMain;
