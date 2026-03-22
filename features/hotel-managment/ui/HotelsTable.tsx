"use client";
import { useGetAllHotelsQuery } from "@/entities/Hotel/services/hotel.service";
import React from "react";

function HotelsTable() {
  const { data } = useGetAllHotelsQuery();

  console.log("all hotels", data);
  return <div>HotelsTable</div>;
}

export default HotelsTable;
