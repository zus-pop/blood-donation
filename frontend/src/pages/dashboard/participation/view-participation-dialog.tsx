import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Calendar, User, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ParticipationProps {
  _id: string;
  user: string;
  event: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  userName?: string;
  eventName?: string;
}

interface ViewParticipationDialogProps {
  participation: ParticipationProps;
}

const ViewParticipationDialog = ({ participation }: ViewParticipationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
        <Eye className="size-5" />
        View participation
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl p-0">
        <div className="flex flex-col">
          <div className="p-6 flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-1">
                Participation Detail
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm mb-2">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="font-semibold ml-1">{participation.userName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span className="font-semibold ml-1">{participation.eventName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge
                    className={
                      participation.status === "REGISTERED"
                        ? "bg-blue-100 text-blue-700"
                        : participation.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }
                  >
                    {participation.status}
                  </Badge>
                </div>
              </div>
            </DialogHeader>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
              <div className="space-y-2">
                {participation.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-semibold">Created:</span>
                    <span className="ml-1">{new Date(participation.createdAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {participation.updatedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-semibold">Updated:</span>
                    <span className="ml-1">{new Date(participation.updatedAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewParticipationDialog; 