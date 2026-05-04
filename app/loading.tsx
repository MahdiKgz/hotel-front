"use client";
import { Spin } from "antd";
import React from "react";

function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
      <Spin size="large" />
      <h1 className="text-gray-900! font-bold text-center text-2xl">
        در حال بارگزاری
      </h1>
    </div>
  );
}

export default Loading;
