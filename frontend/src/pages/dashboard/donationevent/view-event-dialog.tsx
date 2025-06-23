import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Calendar, Eye, MapPin, Users, Image as ImageIcon } from "lucide-react";
import { Separator } from "../../../components/ui/separator";

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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl p-0">
        <div className="flex flex-col">
          {/* Event Image */}
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-t-2xl">
              <ImageIcon className="w-16 h-16 text-gray-300" />
            </div>
          )}
          <div className="p-6 flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-1">{event.title}</DialogTitle>
              <DialogDescription className="flex flex-wrap items-center gap-4 text-sm mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(event.createdAt).toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  Status: <span className="font-semibold ml-1">{event.status}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Description:</span>
                  <div className="whitespace-pre-wrap text-gray-700">{event.description}</div>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="font-semibold">Location:</span>
                  <span className="ml-1">{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="font-semibold">Slots:</span>
                  <span className="ml-1">{event.slot}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Registration:</span>
                  <span className="whitespace-nowrap block">{`${new Date(event.registrationStartedAt).toLocaleString()} – ${new Date(event.registrationEndedAt).toLocaleString()}`}</span>
                </div>
                <div>
                  <span className="font-semibold">Event:</span>
                  <span className="whitespace-nowrap block">{`${new Date(event.eventStartedAt).toLocaleString()} – ${new Date(event.eventEndedAt).toLocaleString()}`}</span>
                </div>
                <div>
                  <span className="font-semibold">Last updated:</span>
                  <div>{event.updatedAt ? new Date(event.updatedAt).toLocaleString() : '-'}</div>
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
