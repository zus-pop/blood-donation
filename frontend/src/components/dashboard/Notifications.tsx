import { useEffect, useState } from "react";
import { getInventories } from "@/apis/bloodInventory.api";
import { getEvents } from "@/apis/event.api";

const Notifications = () => {
  const [lowStock, setLowStock] = useState<string[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getInventories().then((inv) => {
      const lows = inv.filter((i: any) => i.unit < 5).map((i: any) => i.bloodType);
      setLowStock(lows);
    });
    getEvents().then((ev) => {
      setEvents(ev.filter((e: any) => new Date(e.date) > new Date()).slice(0, 2));
    });
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <div className="font-semibold mb-2">Notifications</div>
      <ul className="list-disc pl-5 text-sm text-red-600">
        {lowStock.map((type, i) => (
          <li key={i}>Low inventory for {type} blood type!</li>
        ))}
        {events.map((e, i) => (
          <li key={i} className="text-blue-600">Upcoming event: {e.location}, {new Date(e.date).toLocaleDateString()}</li>
        ))}
        {lowStock.length === 0 && events.length === 0 && <li className="text-gray-500">No notifications</li>}
      </ul>
    </div>
  );
};

export default Notifications;
