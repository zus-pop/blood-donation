import { useEffect, useState } from "react";
import { getInventories } from "@/apis/bloodInventory.api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#2563eb", "#f87171", "#fbbf24", "#34d399", "#a78bfa", "#f472b6", "#60a5fa", "#facc15"];

const PieBloodTypeChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getInventories().then((inv) => {
      const grouped: Record<string, number> = {};
      inv.forEach((item: any) => {
        const type = typeof item.bloodType === "string" ? item.bloodType : item.bloodType?.bloodType;
        const quantity = item.unit ?? item.quantity ?? 0;
        grouped[type] = (grouped[type] || 0) + quantity;
      });
      setData(Object.entries(grouped).map(([bloodType, value]) => ({ name: bloodType, value })));
    });
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <div className="font-semibold mb-2">Blood Type Distribution</div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieBloodTypeChart;
