import HotelHeader from "@/features/hotel-managment/ui/HotelHeader";
import HotelsTable from "@/features/hotel-managment/ui/HotelsTable";
import React from "react";

function HotelsManagement() {
  return (
    <div className="w-full h-full flex flex-col items-start gap-6">
      <HotelHeader />
      <HotelsTable />
    </div>
  );
}

export default HotelsManagement;
