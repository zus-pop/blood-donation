import { useQuery } from "@tanstack/react-query";
import { getParticipations } from "@/apis/participation.api";
import { getEvents } from "@/apis/event.api";
import { useProfileStore } from "@/store/profileStore";
import { formatEventDateShort } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, ListChecks, CalendarX, Plus, Heart } from "lucide-react";

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
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center mb-4 mx-auto">
              <CalendarX className="w-16 h-16 text-red-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Events Yet</h3>
          <p className="text-gray-500 text-center mb-6 max-w-md">
            You haven't registered for any donation events yet. Start making a difference by joining our community events!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="/donationevents" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Register for Events
            </a>
            <a 
              href="/donationevents" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              View All Events
            </a>
          </div>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-2xl">
            <div className="p-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Save Lives</h4>
              <p className="text-sm text-gray-500">Your donation can save up to 3 lives</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Easy Registration</h4>
              <p className="text-sm text-gray-500">Quick and simple event registration</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Convenient Locations</h4>
              <p className="text-sm text-gray-500">Events near your location</p>
            </div>
          </div>
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
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 mb-2 border border-green-100">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                                         <span className="font-medium text-gray-700">Start:</span>
                    <span className="ml-2 text-green-600 font-semibold">
                      {item.eventDetail ? formatEventDateShort(item.eventDetail.eventStartedAt) : '-'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                                         <span className="font-medium text-gray-700">End:</span>
                    <span className="ml-2 text-blue-600 font-semibold">
                      {item.eventDetail ? formatEventDateShort(item.eventDetail.eventEndedAt) : '-'}
                    </span>
                  </div>
                </div>
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