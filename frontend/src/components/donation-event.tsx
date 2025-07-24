import { Calendar, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { EventProps } from "../apis/event.api";
import { getEvents } from "../apis/event.api";
import type { ParticipationProps } from "../apis/participation.api";
import {
  createParticipation,
  getParticipations,
} from "../apis/participation.api";
import { useAuth } from "../context/AuthContext";
import { formatEventDateShort } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ITEMS_PER_PAGE = 6;

const DonationEvent = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [participations, setParticipations] = useState<ParticipationProps[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { openModal, isAuthenticated, user } = useAuth();

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [eventData, participationData] = await Promise.all([
        getEvents(),
        getParticipations(),
      ]);
      // Filter out ENDED and CANCELLED events
      const activeEvents = eventData.filter(event => 
        event.status !== "ENDED" && event.status !== "CANCELLED"
      );
      // Sort events by eventStartedAt from nearest to farthest
      const sortedEvents = activeEvents.sort((a, b) => 
        new Date(a.eventStartedAt).getTime() - new Date(b.eventStartedAt).getTime()
      );
      setEvents(sortedEvents);
      setParticipations(participationData);
      // Đồng bộ trạng thái Registered giống trang DonationEvents
      if (isAuthenticated && user) {
        // Lấy participation của user hiện tại, status REGISTERED
        const userParticipations = participationData.filter((p) => {
          // user có thể là string hoặc object
          const userId =
            typeof p.user === "string"
              ? p.user
              : typeof p.user === "object" &&
                p.user !== null &&
                "_id" in p.user
              ? (p.user as { _id: string })._id
              : "";
          return userId === user._id && p.status === "REGISTERED";
        });
        // Debug: in ra userParticipations
        console.log("DEBUG userParticipations:", userParticipations);
      }
    } catch {
      setError("Failed to load events or participations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, [isAuthenticated, user]);

  // Lọc event theo search và tháng
  const filteredEvents = events.filter((e) => {
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase());
    
    if (selectedMonth === "all") {
      return matchSearch;
    }
    
    const eventDate = new Date(e.eventStartedAt);
    const eventMonth = eventDate.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
    const selectedMonthNum = parseInt(selectedMonth);
    
    return matchSearch && eventMonth === selectedMonthNum;
  });

  // Các event sẽ render
  const renderEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEvents.length;

  // Tính slot còn lại cho từng event
  const getAvailableSlot = (event: EventProps) => {
    const registered = participations.filter(
      (p) => p.event === event._id && p.status === "REGISTERED"
    ).length;
    return Math.max(0, (event.slot || 0) - registered);
  };

  // Đăng ký event
  const handleRegisterClick = async (eventId: string) => {
    if (!isAuthenticated || !user) {
      openModal();
    } else {
      // Check if event is still available for registration
      const eventToRegister = events.find(e => e._id === eventId);
      if (eventToRegister && (eventToRegister.status === "ENDED" || eventToRegister.status === "CANCELLED")) {
        toast.error(`Cannot register for ${eventToRegister.status.toLowerCase()} events.`);
        return;
      }
      // Kiểm tra điều kiện 3 tháng kể từ lần attended gần nhất
      // 1. Lấy tất cả participation của user có status ATTENDED
      const attendedParts = participations.filter((p) => {
        const userId =
          typeof p.user === "string"
            ? p.user
            : typeof p.user === "object" && p.user !== null && "_id" in p.user
            ? (p.user as { _id: string })._id
            : "";
        return userId === user._id && p.status === "ATTENDED";
      });
      if (attendedParts.length > 0) {
        // 2. Tìm event attended gần nhất
        const attendedEvents = attendedParts
          .map((p) => {
            const ev = events.find(
              (e) =>
                e._id ===
                (typeof p.event === "string"
                  ? p.event
                  : typeof p.event === "object" &&
                    p.event !== null &&
                    "_id" in p.event
                  ? (p.event as { _id: string })._id
                  : "")
            );
            return ev ? { ...ev, participationId: p._id } : null;
          })
          .filter(Boolean) as (EventProps & { participationId?: string })[];
        attendedEvents.sort(
          (a, b) =>
            new Date(b.eventEndedAt).getTime() -
            new Date(a.eventEndedAt).getTime()
        );
        const latestAttended = attendedEvents[0];
        const latestAttendedEnd = new Date(latestAttended.eventEndedAt);
        // 3. Kiểm tra ngày bắt đầu của event muốn đăng ký
        const eventToRegister = events.find((e) => e._id === eventId);
        if (eventToRegister) {
          const eventStart = new Date(eventToRegister.eventStartedAt);
          const threeMonthsAfter = new Date(latestAttendedEnd);
          threeMonthsAfter.setMonth(threeMonthsAfter.getMonth() + 3);
          if (eventStart <= latestAttendedEnd) {
            toast.error(
              "You cannot register for events that occur before or at the same time as your most recent blood donation event."
            );
            return;
          }
          if (eventStart <= threeMonthsAfter) {
            toast.error(
              "You have participated in a blood donation event within the past 3 months. Please wait for the full 3-month period before registering for a new event."
            );
            return;
          }
        }
      }
      try {
        await createParticipation({
          user: user._id,
          event: eventId,
          status: "REGISTERED",
        });
        toast.success("Successfully registered for the event!");
        setParticipations((prev) => [
          ...prev,
          { user: user._id, event: eventId, status: "REGISTERED" },
        ]);
      } catch {
        toast.error(
          "Failed to register for the event. You may have already registered."
        );
      }
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Find a Blood Drive Near You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We host blood drives throughout the community. Find one convenient
            for you.
          </p>
        </div>
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search event"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
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
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={fetchAll}
              disabled={loading}
            >
              <Search className="mr-2 h-4 w-4" />
              {loading ? "Refreshing..." : "Search"}
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-500 py-10">
            Loading events...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : renderEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-red-400" />
              </div>
                             <h3 className="text-2xl font-bold text-gray-800 mb-2">
                 {selectedMonth === "all" && search 
                   ? "No events found"
                   : selectedMonth !== "all"
                   ? `No events in ${selectedMonth === "1" ? "January" : selectedMonth === "2" ? "February" : selectedMonth === "3" ? "March" : selectedMonth === "4" ? "April" : selectedMonth === "5" ? "May" : selectedMonth === "6" ? "June" : selectedMonth === "7" ? "July" : selectedMonth === "8" ? "August" : selectedMonth === "9" ? "September" : selectedMonth === "10" ? "October" : selectedMonth === "11" ? "November" : "December"}`
                   : search
                   ? "No matching events found"
                   : "No events yet"}
               </h3>
                             <p className="text-gray-500 mb-6 max-w-md mx-auto">
                 {selectedMonth === "all" && search
                   ? `No events match the keyword "${search}". Try searching with different keywords.`
                   : selectedMonth !== "all"
                   ? `There are currently no blood donation events in ${selectedMonth === "1" ? "January" : selectedMonth === "2" ? "February" : selectedMonth === "3" ? "March" : selectedMonth === "4" ? "April" : selectedMonth === "5" ? "May" : selectedMonth === "6" ? "June" : selectedMonth === "7" ? "July" : selectedMonth === "8" ? "August" : selectedMonth === "9" ? "September" : selectedMonth === "10" ? "October" : selectedMonth === "11" ? "November" : "December"}. Please select another month or view all events.`
                   : search
                   ? "Try searching with different keywords or clear the filter."
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
                 {search && (
                   <Button
                     onClick={() => setSearch("")}
                     variant="outline" 
                     className="px-6 py-2"
                   >
                     Clear search
                   </Button>
                 )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {renderEvents.map((event) => {
              const availableSlot = getAvailableSlot(event);
              // Kiểm tra: user đã từng đăng ký event này chưa (bất kỳ status nào)
              const isRegistered = participations.some((p) => {
                // user có thể là string hoặc object
                const userId =
                  typeof p.user === "string"
                    ? p.user
                    : typeof p.user === "object" &&
                      p.user !== null &&
                      "_id" in p.user
                    ? (p.user as { _id: string })._id
                    : "";
                if (userId !== (user?._id || "")) return false;
                // event có thể là string hoặc object
                const eventId =
                  typeof p.event === "string"
                    ? p.event
                    : typeof p.event === "object" &&
                      p.event !== null &&
                      "_id" in p.event
                    ? String((p.event as { _id: string })._id)
                    : "";
                return eventId === event._id;
              });
              return (
                <Card
                  key={event._id}
                  className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white flex flex-col md:flex-row items-stretch min-h-[280px] md:min-h-[240px]"
                >
                  {/* Ảnh event: desktop và mobile */}
                  {event.image && (
                    <>
                      <div className="hidden md:block w-96 h-56 flex-shrink-0 overflow-hidden bg-gray-100 rounded-2xl m-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                        />
                      </div>
                      <div className="block md:hidden w-full h-52 mb-4 mx-4 mt-4 overflow-hidden bg-gray-100 rounded-2xl">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                    </>
                  )}
                  <CardContent className="flex-1 p-4 md:p-6 md:pr-8 flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
                          {event.title}
                        </h3>
                        {availableSlot === 0 && (
                          <span className="ml-2 text-xs text-red-500 font-semibold">
                            Full
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm gap-2">
                        <MapPin className="h-4 w-4 mr-1 text-red-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 mt-2">
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-green-500" />
                                                         <span className="font-medium text-gray-700">Start:</span>
                            <span className="ml-2 text-green-600 font-semibold">
                              {event.eventStartedAt ? formatEventDateShort(event.eventStartedAt) : 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-red-500" />
                                                         <span className="font-medium text-gray-700">End:</span>
                            <span className="ml-2 text-red-600 font-semibold">
                              {event.eventEndedAt ? formatEventDateShort(event.eventEndedAt) : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4 justify-between">
                      <Badge
                        className={`px-4 py-1 rounded-full text-base font-semibold border w-fit ${
                          availableSlot > 0
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {availableSlot > 0
                          ? `${availableSlot} slots available`
                          : "No slots left"}
                      </Badge>
                      {isRegistered ? (
                        <Button
                          className="bg-gray-400 text-white w-full md:w-auto font-semibold rounded-full px-6 py-2 shadow transition"
                          disabled
                        >
                          Registered
                        </Button>
                      ) : (
                        <Button
                          className="w-full md:w-auto bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold rounded-full px-6 py-2 shadow-lg text-base transition disabled:bg-gray-300"
                          disabled={availableSlot === 0}
                          onClick={() => handleRegisterClick(event._id)}
                        >
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
            <Button
              variant="outline"
              onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
            >
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
