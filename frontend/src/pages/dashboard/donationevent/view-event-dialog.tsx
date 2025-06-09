import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Calendar, Eye } from "lucide-react";
import { Separator } from "../../../components/ui/separator";

interface EventProps {
  _id: string;
  title: string;
  description: string;
  registrationStartedAt: string;
  registrationEndedAt: string;
  eventStartedAt: string;
  eventEndedAt: string;
  status: string;
  createdAt: string;
}

interface ViewEventDialogProps {
  event: EventProps;
}

const ViewEventDialog = ({ event }: ViewEventDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 rounded-md cursor-none hover:bg-gray-200">
        <Eye className="size-5" />
        View event
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(event.createdAt).toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              Status: {event.status}
            </div>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            <strong>Description:</strong> {event.description}
            <br />
            <strong>Registration:</strong> {event.registrationStartedAt} - {event.registrationEndedAt}
            <br />
            <strong>Event:</strong> {event.eventStartedAt} - {event.eventEndedAt}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEventDialog;
