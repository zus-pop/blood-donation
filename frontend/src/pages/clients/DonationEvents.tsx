import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEvents } from "@/apis/event.api";
import type { EventProps } from "@/apis/event.api";
import { useAuth } from "@/context/AuthContext";
import { createParticipation, getParticipations } from "@/apis/participation.api";
import { formatEventDateShort } from "@/lib/utils";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

export default function DonationEvents() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openModal, isAuthenticated, user } = useAuth();
  const [userParticipations, setUserParticipations] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 3;
  
  // Filter events by month
  const filteredEvents = events.filter((event) => {
    if (selectedMonth === "all") {
      return true;
    }
    
    const eventDate = new Date(event.eventStartedAt);
    const eventMonth = eventDate.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
    const selectedMonthNum = parseInt(selectedMonth);
    
    return eventMonth === selectedMonthNum;
  });
  
  const totalPages = Math.ceil(filteredEvents.length / pageSize);
  const paginatedEvents = filteredEvents.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEvents();
        // Filter out ENDED and CANCELLED events
        const activeEvents = data.filter(event => 
          event.status !== "ENDED" && event.status !== "CANCELLED"
        );
        // Sort events by eventStartedAt from nearest to farthest
        const sortedEvents = activeEvents.sort((a, b) => 
          new Date(a.eventStartedAt).getTime() - new Date(b.eventStartedAt).getTime()
        );
        setEvents(sortedEvents);
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

  // Reset page when month filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedMonth]);

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
    
    // Check if event is still available for registration
    if (eventToRegister.status === "ENDED" || eventToRegister.status === "CANCELLED") {
      toast.error(`Cannot register for ${eventToRegister.status.toLowerCase()} events.`);
      return;
    }
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
        toast.error("You cannot register for events that occur before or at the same time as your most recent blood donation event.");
        return;
      }
      if (eventStart <= threeMonthsAfter) {
        toast.error("You have participated in a blood donation event within the past 3 months. Please wait for the full 3-month period before registering for a new event.");
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
      
      {/* Month Filter */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-xs">
                     <Select value={selectedMonth} onValueChange={(value) => {
             setSelectedMonth(value);
             setPage(1); // Reset to first page when filter changes
           }}>
             <SelectTrigger className="w-full">
               <SelectValue placeholder="Select month" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="all">All months</SelectItem>
               <SelectItem value="1">January</SelectItem>
               <SelectItem value="2">February</SelectItem>
               <SelectItem value="3">March</SelectItem>
               <SelectItem value="4">April</SelectItem>
               <SelectItem value="5">May</SelectItem>
               <SelectItem value="6">June</SelectItem>
               <SelectItem value="7">July</SelectItem>
               <SelectItem value="8">August</SelectItem>
               <SelectItem value="9">September</SelectItem>
               <SelectItem value="10">October</SelectItem>
               <SelectItem value="11">November</SelectItem>
               <SelectItem value="12">December</SelectItem>
             </SelectContent>
           </Select>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center">Loading events...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-red-400" />
            </div>
                         <h3 className="text-2xl font-bold text-gray-800 mb-2">
               {selectedMonth !== "all"
                 ? `No events in ${selectedMonth === "1" ? "January" : selectedMonth === "2" ? "February" : selectedMonth === "3" ? "March" : selectedMonth === "4" ? "April" : selectedMonth === "5" ? "May" : selectedMonth === "6" ? "June" : selectedMonth === "7" ? "July" : selectedMonth === "8" ? "August" : selectedMonth === "9" ? "September" : selectedMonth === "10" ? "October" : selectedMonth === "11" ? "November" : "December"}`
                 : "No events yet"}
             </h3>
             <p className="text-gray-500 mb-6 max-w-md mx-auto">
               {selectedMonth !== "all"
                 ? `There are currently no blood donation events in ${selectedMonth === "1" ? "January" : selectedMonth === "2" ? "February" : selectedMonth === "3" ? "March" : selectedMonth === "4" ? "April" : selectedMonth === "5" ? "May" : selectedMonth === "6" ? "June" : selectedMonth === "7" ? "July" : selectedMonth === "8" ? "August" : selectedMonth === "9" ? "September" : selectedMonth === "10" ? "October" : selectedMonth === "11" ? "November" : "December"}. Please select another month or view all events.`
                 : "There are currently no blood donation events. Please check back later."}
             </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                             {selectedMonth !== "all" && (
                 <Button
                   onClick={() => setSelectedMonth("all")}
                   variant="outline"
                   className="px-6 py-2"
                 >
                   View all months
                 </Button>
               )}
               <Button
                 onClick={() => window.location.href = '/'}
                 className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
               >
                 Go to Home
               </Button>
            </div>
          </div>
        </div>
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
                  <p className="mb-3 text-muted-foreground line-clamp-2">{event.description}</p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border border-blue-100">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                                                 <span className="text-sm font-medium text-gray-600">🗓️ Start:</span>
                        <span className="text-sm font-bold text-blue-600">
                          {event.eventStartedAt ? formatEventDateShort(event.eventStartedAt) : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                                                 <span className="text-sm font-medium text-gray-600">⏰ End:</span>
                        <span className="text-sm font-bold text-purple-600">
                          {event.eventEndedAt ? formatEventDateShort(event.eventEndedAt) : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                                                 <span className="text-sm font-medium text-gray-600">📍 Location:</span>
                        <span className="text-sm font-bold text-green-600">{event.location || 'Thu Duc City'}</span>
                      </div>
                    </div>
                  </div>
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