"use client";
import { Spin } from "antd";
import React from "react";

function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-10 bg-brand">
      <Spin size="large" />
      <h1 className="text-white font-bold text-center text-2xl">
        در حال بارگزاری
      </h1>
    </div>
  );
}

export default Loading;
