import { useEffect, useState } from "react";
import { getBloodRequests } from "@/apis/bloodrequest.api";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { DateRangePicker } from "@/components/ui/date-range-picker";

const AreaRequestTrendChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });

  useEffect(() => {
    getBloodRequests({}).then((reqs) => {
      const grouped: Record<string, number> = {};
      reqs.forEach((item: any) => {
        const date = (item.createdAt || item.date || "").slice(0, 10);
        const quantity = Number(item.quantity) || 0;
        grouped[date] = (grouped[date] || 0) + quantity;
      });
      // Sort by date
      let sorted = Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, quantity]) => ({ date, quantity }));
      // Filter theo dateRange nếu có
      if (dateRange.from && dateRange.to) {
        const fromStr = dateRange.from.toISOString().slice(0, 10);
        const toStr = dateRange.to.toISOString().slice(0, 10);
        sorted = sorted.filter(item => item.date >= fromStr && item.date <= toStr);
      }
      setData(sorted);
    });
  }, [dateRange]);

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <div className="font-semibold mb-2">Total ML per Day</div>
      <div className="flex gap-2 mb-2 items-center">
        <DateRangePicker value={dateRange} onChange={setDateRange} maxDays={7} />
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="quantity" stroke="#60a5fa" fill="#93c5fd" strokeWidth={2} name="Total ML" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaRequestTrendChart;
