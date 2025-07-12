import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/apis/event.api";
import type { EventProps } from "@/apis/event.api";
import { useAuth } from "@/context/AuthContext";
import { createParticipation, getParticipations, updateParticipation } from "@/apis/participation.api";
import { toast } from "sonner";

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export default function DonationEvents() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openModal, isAuthenticated, user } = useAuth();
  const [userParticipations, setUserParticipations] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(events.length / pageSize);
  const paginatedEvents = events.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEvents();
        setEvents(data);
      } catch {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchUserParticipations = async () => {
      if (isAuthenticated && user) {
        try {
          const participations = await getParticipations();
          // Lọc participation chỉ của user hiện tại
          const userParts = participations.filter(p => p.user === user._id);
          setUserParticipations(userParts);
        } catch {
          // Handle error silently, don't block user from seeing events
          console.error("Failed to fetch user participations");
        }
      }
    };
    fetchUserParticipations();
  }, [isAuthenticated, user]);

  // Tập hợp các eventId user đã từng đăng ký (bất kỳ status nào)
  const registeredEventIds = new Set(userParticipations.map(p => p.event));

  const handleRegisterClick = async (eventId: string) => {
    if (!isAuthenticated || !user) {
      openModal();
      return;
    }
    // Lấy event user muốn đăng ký
    const eventToRegister = events.find(e => e._id === eventId);
    if (!eventToRegister) return;
    // Lấy các participation attended
    const attendedParts = userParticipations.filter(p => p.status === "ATTENDED");
    if (attendedParts.length > 0) {
      // Lấy event attended gần nhất
      const attendedEvents = attendedParts.map(p => {
        const ev = events.find(e => e._id === p.event);
        return ev ? { ...ev, participationId: p._id } : null;
      }).filter(Boolean) as (EventProps & { participationId?: string })[];
      attendedEvents.sort((a, b) => new Date(b.eventEndedAt).getTime() - new Date(a.eventEndedAt).getTime());
      const latestAttended = attendedEvents[0];
      const latestAttendedEnd = new Date(latestAttended.eventEndedAt);
      // Chỉ cho phép đăng ký event có ngày bắt đầu > 3 tháng kể từ event attended gần nhất
      const eventStart = new Date(eventToRegister.eventStartedAt);
      const threeMonthsAfter = new Date(latestAttendedEnd);
      threeMonthsAfter.setMonth(threeMonthsAfter.getMonth() + 3);
      if (eventStart <= latestAttendedEnd) {
        toast.error("Bạn không thể đăng ký sự kiện có thời gian trước hoặc trùng với sự kiện bạn đã hiến máu gần nhất.");
        return;
      }
      if (eventStart <= threeMonthsAfter) {
        toast.error("Bạn đã tham gia 1 sự kiện hiến máu trong vòng 3 tháng trở lại đây, vui lòng chờ đủ 3 tháng để đăng ký sự kiện mới.");
        return;
      }
    }
    try {
      await createParticipation({
        user: user._id,
        event: eventId,
        status: "REGISTERED",
      });
      toast.success("Successfully registered for the event!");
      // Refetch participations để cập nhật UI
      const participations = await getParticipations();
      const userParts = participations.filter(p => p.user === user._id);
      setUserParticipations(userParts);
    } catch {
      toast.error("Failed to register for the event. You may have already registered.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Donation Events</h1>
      {loading ? (
        <div className="text-center">Loading events...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedEvents.map((event) => (
              <Card key={event._id} className="overflow-hidden shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
                <div className="overflow-hidden h-56 bg-gray-100 flex items-center justify-center">
                  {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <span className="text-6xl text-red-400">🩸</span>
                  )}
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors duration-200">{event.title}</h2>
                  <p className="mb-2 text-muted-foreground">{event.description}</p>
                  <div className="mb-2 text-sm">
                    Date: <span className="font-medium">{event.eventStartedAt?.slice(0, 10)}</span>
                  </div>
                  <div className="mb-2 text-sm">
                    End date: <span className="font-medium">{event.eventEndedAt?.slice(0, 10)}</span>
                  </div>
                  <div className="mb-4 text-sm">Location: <span className="font-medium">Thu Duc City</span></div>
                  {registeredEventIds.has(event._id) ? (
                    <Button
                      disabled
                      className="bg-gray-400 text-white font-semibold shadow-lg px-6 py-2 rounded transition-all duration-200"
                    >
                      Registered
                    </Button>
                  ) : (
                    <Button 
                      className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold shadow-lg px-6 py-2 rounded transition-all duration-200" 
                      onClick={() => handleRegisterClick(event._id)}
                    >
                      Register to Donate
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded border font-semibold ${p === page ? 'bg-red-500 text-white border-red-500' : 'bg-white text-red-500 border-red-500 hover:bg-red-100'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
} 