"use client";
import React from "react";
import { Select } from "antd";

function RoomsPage() {
  return (
    <div className="h-125 flex items-center p-5">
      <div className="container">RoomsPage</div>
      <Select
        onChange={(value) =>
          console.log("select just chaned now to => ", value)
        }
        placeholder="فیلتر ها رو جستجو کنید"
        options={[{ value: "مهدی", label: "بر اساس نام" }]}
      />
    </div>
  );
}

export default RoomsPage;
