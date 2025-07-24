import { useEffect, useState } from "react";
import { getInventories } from "@/apis/bloodInventory.api";
import { getUsers } from "@/apis/user.api";
import { getBloodRequests } from "@/apis/bloodrequest.api";
import { getEvents } from "@/apis/event.api";

const SummaryCards = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getInventories().then(setInventory);
    getUsers().then(setUsers);
    getBloodRequests({ status: "PENDING" }).then(setRequests);
    getEvents().then(setEvents);
  }, []);

  // Calculate blood type breakdown
  const bloodTypeCount: Record<string, number> = {};

  inventory.forEach((item) => {
    // bloodType can be string or object
    const type = typeof item.bloodType === "string" ? item.bloodType : item.bloodType?.bloodType;
    const quantity = item.unit ?? item.quantity ?? 0;
    bloodTypeCount[type] = (bloodTypeCount[type] || 0) + quantity;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded shadow p-4">
        <div className="text-sm text-gray-500">Total Blood Units (ml)</div>
        <div className="text-2xl font-bold">{inventory.reduce((sum, i) => sum + (i.unit ?? i.quantity ?? 0), 0)}</div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="text-sm text-gray-500">Registered Donors</div>
        <div className="text-2xl font-bold">{users.length}</div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="text-sm text-gray-500">Pending Requests</div>
        <div className="text-2xl font-bold">{requests.length}</div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="text-sm text-gray-500">Upcoming Events</div>
        <div className="text-2xl font-bold">{events.length}</div>
      </div>
    </div>
  );
};

export default SummaryCards;
