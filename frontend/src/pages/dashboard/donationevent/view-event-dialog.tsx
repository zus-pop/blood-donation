import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Eye, MapPin, Users, Image as ImageIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface EventProps {
  _id: string;
  title: string;
  description: string;
  registrationStartedAt: string;
  registrationEndedAt: string;
  eventStartedAt: string;
  eventEndedAt: string;
  slot: number;
  location: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  image?: string;
}

interface ViewEventDialogProps {
  event: EventProps;
}

const ViewEventDialog = ({ event }: ViewEventDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
        <Eye className="size-5" />
        View event
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl p-0 bg-white shadow-xl">
        <div className="flex flex-col">
          {/* Event Image */}
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover rounded-t-2xl border-b border-gray-200"
              style={{ objectPosition: 'center' }}
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-t-2xl border-b border-gray-200">
              <ImageIcon className="w-16 h-16 text-gray-300" />
            </div>
          )}
          <div className="p-6 flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold mb-1 text-gray-900">
                {event.title}
              </DialogTitle>
              <DialogDescription className="flex flex-wrap items-center gap-4 text-sm mb-2 text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Status:</span>
                  <span className="font-semibold ml-1 text-blue-600 uppercase tracking-wide">{event.status}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-800">Description:</span>
                  <div className="whitespace-pre-wrap text-gray-700 mt-1">
                    {event.description}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="font-semibold text-gray-800">Location:</span>
                  <span className="ml-1 text-gray-700">{event.location}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-gray-800">Slots:</span>
                  <span className="ml-1 text-gray-700">{event.slot}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-800">Registration:</span>
                  <span className="whitespace-nowrap block text-gray-700 mt-1">{`${new Date(
                    event.registrationStartedAt
                  ).toLocaleString()} – ${new Date(
                    event.registrationEndedAt
                  ).toLocaleString()}`}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Event:</span>
                  <span className="whitespace-nowrap block text-gray-700 mt-1">{`${new Date(
                    event.eventStartedAt
                  ).toLocaleString()} – ${new Date(
                    event.eventEndedAt
                  ).toLocaleString()}`}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Last updated:</span>
                  <div className="text-gray-700 mt-1">
                    {event.updatedAt
                      ? new Date(event.updatedAt).toLocaleString()
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEventDialog;
