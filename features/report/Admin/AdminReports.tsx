import React from "react";
import useGetAdminReport from "./hooks/useGetAdminReport";
import AdminReportChart from "./AdminReportChart";
import { LuBedDouble, LuCalendarCheck2, LuHotel } from "react-icons/lu";

function AdminReports() {
  const { adminReport } = useGetAdminReport();
  return (
    <div className="admin-reports">
      <div className="admin-metrics-grid">
        <div className="admin-metric-card">
          <span><LuHotel /></span>
          <div><small>مجموع هتل‌ها</small><strong>{adminReport?.totalHotels ?? "—"}</strong><em>هتل فعال در سامانه</em></div>
        </div>
        <div className="admin-metric-card">
          <span><LuBedDouble /></span>
          <div><small>مجموع اتاق‌ها</small><strong>{adminReport?.totalRooms ?? "—"}</strong><em>ظرفیت قابل رزرو</em></div>
        </div>
        <div className="admin-metric-card">
          <span><LuCalendarCheck2 /></span>
          <div><small>مجموع رزروها</small><strong>{adminReport?.totalRooms ?? "—"}</strong><em>رزرو ثبت‌شده</em></div>
        </div>
      </div>
      <div className="admin-chart-card">
        <div><span>گزارش عملکرد</span><h2>روند رزروها</h2></div>
        <AdminReportChart reservesTimeline={adminReport?.reservesTimeline} />
      </div>
    </div>
  );
}

export default AdminReports;
