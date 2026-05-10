import React from "react";
import useGetAdminReport from "./hooks/useGetAdminReport";
import AdminReportChart from "./AdminReportChart";

function AdminReports() {
  const { adminReport } = useGetAdminReport();
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex flex-wrap lg:flex-nowrap items-start justify-between gap-3">
        <div className="w-full lg:w-1/3 p-2 flex flex-col items-start gap-1.5 border-2 border-gray-300 rounded-xl">
          <h1 className="text-sm font-semibold! text-zinc-600">مجموع هتل ها</h1>
          <span className="text-lg font-bold">{adminReport?.totalHotels}</span>
        </div>
        <div className="w-full lg:w-1/3 p-2 flex flex-col items-start gap-1.5 border-2 border-gray-300 rounded-xl">
          <h1 className="text-sm font-semibold! text-zinc-600">
            مجموع اتاق ها
          </h1>
          <span className="text-lg font-bold">{adminReport?.totalRooms}</span>
        </div>
        <div className="w-full lg:w-1/3 p-2 flex flex-col items-start gap-1.5 border-2 border-gray-300 rounded-xl">
          <h1 className="text-sm font-semibold! text-zinc-600">
            مجموع رزرو ها
          </h1>
          <span className="text-lg font-bold">{adminReport?.totalRooms}</span>
        </div>
      </div>
      <div className="admin-report-charts w-full flex flex-col items-start gap-3.5">
        <h1 className="text-xl lg:text-lg font-bold">آمار رزرو ها</h1>
        <AdminReportChart reservesTimeline={adminReport?.reservesTimeline} />
      </div>
    </div>
  );
}

export default AdminReports;
