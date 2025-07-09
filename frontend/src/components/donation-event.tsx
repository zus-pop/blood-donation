import { Calendar, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { getEvents } from "../apis/event.api";
import type { EventProps } from "../apis/event.api";
import { getParticipations, createParticipation } from "../apis/participation.api";
import type { ParticipationProps } from "../apis/participation.api";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 6;

const DonationEvent = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [participations, setParticipations] = useState<ParticipationProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { openModal, isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [eventData, participationData] = await Promise.all([
          getEvents(),
          getParticipations()
        ]);
        setEvents(eventData);
        setParticipations(participationData);
        // Đồng bộ trạng thái Registered giống trang DonationEvents
        if (isAuthenticated && user) {
          // Lấy participation của user hiện tại, status REGISTERED
          const userParticipations = participationData.filter(p => {
            // user có thể là string hoặc object
            const userId = typeof p.user === 'string' ? p.user : (typeof p.user === 'object' && p.user !== null && '_id' in p.user ? (p.user as { _id: string })._id : '');
            return userId === user._id && p.status === 'REGISTERED';
          });
          // Debug: in ra userParticipations
          console.log('DEBUG userParticipations:', userParticipations);
        }
      } catch {
        setError("Failed to load events or participations");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
    // eslint-disable-next-line
  }, [isAuthenticated, user]);

  // Lọc event theo search
  const filteredEvents = events.filter(e =>
    !search || e.title.toLowerCase().includes(search.toLowerCase())
  );

  // Các event sẽ render
  const renderEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEvents.length;

  // Tính slot còn lại cho từng event
  const getAvailableSlot = (event: EventProps) => {
    const registered = participations.filter(p => p.event === event._id && p.status === "REGISTERED").length;
    return Math.max(0, (event.slot || 0) - registered);
  };

  // Đăng ký event
  const handleRegisterClick = async (eventId: string) => {
    if (!isAuthenticated || !user) {
      openModal();
    } else {
      try {
        await createParticipation({
          user: user._id,
          event: eventId,
          status: "REGISTERED",
        });
        toast.success("Successfully registered for the event!");
        setParticipations(prev => ([...prev, { user: user._id, event: eventId, status: "REGISTERED" }]));
      } catch {
        toast.error("Failed to register for the event. You may have already registered.");
      }
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Find a Blood Drive Near You</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We host blood drives throughout the community. Find one convenient for you.
          </p>
        </div>
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="Search event" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setSearch(search)}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-500 py-10">Loading events...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="space-y-4">
            {renderEvents.map((event) => {
              const availableSlot = getAvailableSlot(event);
              // Kiểm tra trực tiếp: user đã đăng ký event này chưa
              const isRegistered = participations.some(p => {
                if (p.status !== 'REGISTERED') return false;
                // user có thể là string hoặc object
                const userId = typeof p.user === 'string' ? p.user : (typeof p.user === 'object' && p.user !== null && '_id' in p.user ? (p.user as { _id: string })._id : '');
                if (userId !== (user?._id || '')) return false;
                // event có thể là string hoặc object
                const eventId = typeof p.event === 'string' ? p.event : (typeof p.event === 'object' && p.event !== null && '_id' in p.event ? String((p.event as { _id: string })._id) : '');
                return eventId === event._id;
              });
              return (
                <Card key={event._id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white flex flex-col md:flex-row items-stretch">
                  {/* Ảnh event: desktop và mobile riêng biệt, không lồng nhau */}
                  {event.image && (
                    <>
                      <div className="hidden md:block w-64 h-40 flex-shrink-0 overflow-hidden bg-gray-100 rounded-xl">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="block md:hidden w-full h-40 mb-2 overflow-hidden bg-gray-100 rounded-xl">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    </>
                  )}
                  <CardContent className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">{event.title}</h3>
                        {availableSlot === 0 && <span className="ml-2 text-xs text-red-500 font-semibold">Full</span>}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm gap-2">
                        <MapPin className="h-4 w-4 mr-1 text-red-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-red-400" />
                          <span>{event.eventStartedAt?.slice(0, 10)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-red-400" />
                          <span>{event.eventEndedAt?.slice(0, 10)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4 justify-between">
                      <Badge className={`px-4 py-1 rounded-full text-base font-semibold border w-fit ${availableSlot > 0 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>{availableSlot > 0 ? `${availableSlot} slots available` : 'No slots left'}</Badge>
                      {isRegistered ? (
                        <Button className="bg-gray-400 text-white w-full md:w-auto font-semibold rounded-full px-6 py-2 shadow transition" disabled>
                          Registered
                        </Button>
                      ) : (
                        <Button className="w-full md:w-auto bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold rounded-full px-6 py-2 shadow-lg text-base transition disabled:bg-gray-300" disabled={availableSlot === 0} onClick={() => handleRegisterClick(event._id)}>
                          Schedule Appointment
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        <div className="mt-8 text-center">
          {hasMore && (
            <Button variant="outline" onClick={() => setVisibleCount(c => c + ITEMS_PER_PAGE)}>
              View More Blood Drives
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DonationEvent;
