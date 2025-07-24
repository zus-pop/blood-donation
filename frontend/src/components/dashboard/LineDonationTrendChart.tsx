import { useEffect, useState } from "react";
import { getInventories } from "@/apis/bloodInventory.api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const LineDonationTrendChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getInventories().then((inv) => {
      // Group by month (YYYY-MM)
      const grouped: Record<string, number> = {};
      inv.forEach((item: any) => {
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
      <div className="font-semibold mb-2">Monthly Blood Invetory Additions</div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineDonationTrendChart;
