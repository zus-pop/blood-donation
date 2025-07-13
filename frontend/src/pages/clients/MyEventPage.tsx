import { useQuery } from "@tanstack/react-query";
import { getParticipations } from "@/apis/participation.api";
import { getEvents } from "@/apis/event.api";
import { useProfileStore } from "@/store/profileStore";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, ListChecks } from "lucide-react";

const statusColor = {
  REGISTERED: "bg-gradient-to-r from-blue-400 to-blue-600 text-white",
  ATTENDED: "bg-gradient-to-r from-green-400 to-green-600 text-white",
  CANCELLED: "bg-gradient-to-r from-red-400 to-red-600 text-white",
  NOT_ELIGIBLE: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
};
const eventStatusColor = {
  UPCOMING: "bg-gradient-to-r from-blue-100 to-blue-300 text-blue-800",
  REGISTRATION: "bg-gradient-to-r from-yellow-100 to-yellow-300 text-yellow-800",
  ONGOING: "bg-gradient-to-r from-green-100 to-green-300 text-green-800",
  ENDED: "bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700",
  CANCELLED: "bg-gradient-to-r from-red-100 to-red-300 text-red-700",
};

export default function MyEventPage() {
  const { profile } = useProfileStore();
  const { data: participations, isLoading: loadingP } = useQuery({
    queryKey: ["participations"],
    queryFn: getParticipations,
  });
  const { data: events, isLoading: loadingE } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (loadingP || loadingE) return <div className="p-8 text-center text-lg animate-pulse">Loading your events...</div>;
  if (!profile) return <div className="p-8 text-center text-lg">Please login to view your events.</div>;

  // Lọc participation của user
  const myParticipations = (participations ?? []).filter(
    (p) => p.user === profile._id
  );
  // Map eventId sang event detail
  const myEvents = myParticipations.map((p) => {
    const event = (events ?? []).find((e) => e._id === p.event);
    return {
      ...p,
      eventDetail: event,
    };
  });

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="h-9 w-9 text-red-600 drop-shadow" />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight">My Registered Events</h1>
          <p className="text-muted-foreground text-base md:text-lg">Track your registered donation events, time, location and status.</p>
        </div>
      </div>
      {myEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/no-data.png" alt="No events" className="w-60 mb-4 opacity-80" />
          <div className="text-lg text-gray-500 mb-2">You have not registered for any events yet.</div>
          <a href="/donationevents" className="inline-block mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition">Register Now</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myEvents.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col gap-3 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-red-500" />
                <span className="font-bold text-lg md:text-xl truncate">{item.eventDetail?.title || "[Deleted]"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <Clock className="h-4 w-4 text-blue-500" />
                {item.eventDetail ? (
                  <>
                    <span>{formatDate(new Date(item.eventDetail.eventStartedAt), true)}</span>
                    <span className="mx-1 text-xs text-gray-400">to</span>
                    <span>{formatDate(new Date(item.eventDetail.eventEndedAt), true)}</span>
                  </>
                ) : "-"}
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>{item.eventDetail?.location || "-"}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <Badge className={`rounded-full px-3 py-1 text-xs font-bold shadow ${eventStatusColor[item.eventDetail?.status || "UPCOMING"] || "bg-gray-100 text-gray-700"}`}>
                  {item.eventDetail?.status || "-"}
                </Badge>
                <Badge className={`rounded-full px-3 py-1 text-xs font-bold shadow ${statusColor[item.status] || "bg-gray-100 text-gray-700"}`}>
                  {item.status === "NOT_ELIGIBLE" ? "Not Eligible" : item.status}
                </Badge>
              </div>
              {item.eventDetail?.image && (
                <img
                  src={item.eventDetail.image}
                  alt="event"
                  className="absolute right-4 bottom-4 w-16 h-16 object-cover rounded-xl shadow-md border border-gray-200 bg-white"
                  style={{ opacity: 1 }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 