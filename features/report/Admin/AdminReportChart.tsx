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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AdminReportChart;
