import { useEffect, useState } from "react";
import { getInventories } from "@/apis/bloodInventory.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const InventoryChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getInventories().then((inv) => {
      // Group by bloodType
      const grouped: Record<string, number> = {};
      inv.forEach((item: any) => {
        const type = typeof item.bloodType === "string" ? item.bloodType : item.bloodType?.bloodType;
        const quantity = item.unit ?? item.quantity ?? 0;
        grouped[type] = (grouped[type] || 0) + quantity;
      });
      setData(Object.entries(grouped).map(([bloodType, unit]) => ({ bloodType, unit })));
    });
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <div className="font-semibold mb-2">Inventory Overview</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bloodType" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="unit" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryChart;
