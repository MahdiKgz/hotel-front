import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ReserveTimeLine {
  count: number;
  date: string;
}

function AdminReportChart({
  reservesTimeline,
}: {
  reservesTimeline: ReserveTimeLine[];
}) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        style={{ margin: " 0 auto" }}
      >
        <LineChart data={reservesTimeline}>
          <CartesianGrid strokeDasharray="4 6" stroke="#e8e5dd" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#8a8a8a", fontSize: 11 }} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#8a8a8a", fontSize: 11 }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #ebe7dc", fontFamily: "ShabnamFarsi" }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#e4a10d"
            strokeWidth={3}
            dot={{ r: 4, fill: "#ffffff", strokeWidth: 3 }}
            activeDot={{ r: 6, fill: "#f3ad12" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AdminReportChart;
