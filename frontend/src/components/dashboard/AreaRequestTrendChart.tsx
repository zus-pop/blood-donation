import { useEffect, useState } from "react";
import { getBloodRequests } from "@/apis/bloodrequest.api";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const AreaRequestTrendChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getBloodRequests({}).then((reqs) => {
      // Group by month (YYYY-MM)
      const grouped: Record<string, number> = {};
      reqs.forEach((item: any) => {
        const month = (item.createdAt || item.date || "").slice(0, 7); // YYYY-MM
        if (month) {
          grouped[month] = (grouped[month] || 0) + 1;
        }
      });
      // Sort by month
      const sorted = Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count }));
      setData(sorted);
    });
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <div className="font-semibold mb-2">Request Trend Over Time</div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="count" stroke="#f87171" fill="#fca5a5" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaRequestTrendChart;
