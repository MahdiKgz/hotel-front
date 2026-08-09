"use client";

import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="auth-guard-page">
      <Spin size="large" />
      <strong>در حال آماده‌سازی تجربه سفر شما...</strong>
    </div>
  );
}
