import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/apis/event.api";
import type { EventProps } from "@/apis/event.api";
import { useAuth } from "@/context/AuthContext";
import { createParticipation, getParticipations } from "@/apis/participation.api";
import { toast } from "sonner";

export default function DonationEvents() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openModal, isAuthenticated, user } = useAuth();
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(new Set());
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
          const userParticipations = participations.filter(p => p.user === user._id);
          const eventIds = new Set(userParticipations.map(p => p.event));
          setRegisteredEventIds(eventIds);
        } catch {
          // Handle error silently, don't block user from seeing events
          console.error("Failed to fetch user participations");
        }
      }
    };
    fetchUserParticipations();
  }, [isAuthenticated, user]);

  const handleRegisterClick = async (eventId: string) => {
    if (!isAuthenticated || !user) {
      openModal();
    } else {
      try {
        await createParticipation({
          user: user._id, // Đúng tên trường backend yêu cầu
          event: eventId, // Đúng tên trường backend yêu cầu
          status: "REGISTERED",
        });
        toast.success("Successfully registered for the event!");
        setRegisteredEventIds(prev => new Set(prev).add(eventId));
      } catch {
        toast.error("Failed to register for the event. You may have already registered.");
      }
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