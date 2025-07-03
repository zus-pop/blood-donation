import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, EyeOff, Calendar, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface OnsiteCheckProps {
  _id: string;
  participationId: string;
  pulseRate?: number;
  bloodPressure?: string;
  hemoglobinLevel?: number;
  bodyTemperature?: number;
  weight?: number;
  canDonate?: boolean;
  checkedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ViewOnsiteCheckDialogProps {
  onsiteCheck: OnsiteCheckProps;
}

const ViewOnsiteCheckDialog = ({ onsiteCheck }: ViewOnsiteCheckDialogProps) => {
  const [showParticipationId, setShowParticipationId] = useState(false);
  const maskParticipationId = (id: string) => id.replace(/./g, '*');
  return (
    <Dialog>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
        <Eye className="size-5" />
        View onsite check
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-0 bg-white">
        <div className="flex flex-col">
          <div className="p-8 flex flex-col gap-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-extrabold mb-2 text-primary flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Onsite Check Detail
              </DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="mb-4">
              <div className="flex items-center gap-2 flex-nowrap bg-gray-50 rounded px-3 py-2 w-full">
                <Tag className="h-5 w-5 text-gray-500" />
                <span className="font-semibold text-gray-700">Participation:</span>
                <span
                  className="text-gray-900 select-all pr-2 text-sm max-w-full overflow-x-auto whitespace-nowrap block text-ellipsis flex-1"
                  style={{ wordBreak: "normal" }}
                  title={showParticipationId ? onsiteCheck.participationId : maskParticipationId(onsiteCheck.participationId)}
                >
                  {showParticipationId ? onsiteCheck.participationId : maskParticipationId(onsiteCheck.participationId)}
                </span>
                <button
                  type="button"
                  className="focus:outline-none flex items-center justify-center"
                  onClick={() => setShowParticipationId((v) => !v)}
                  title={showParticipationId ? 'Hide' : 'Show'}
                  style={{ padding: 0, margin: 0, background: 'none', border: 'none' }}
                >
                  {showParticipationId ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base mt-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Pulse Rate:</span>
                  <span className="text-gray-900">{onsiteCheck.pulseRate ?? '-'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Blood Pressure:</span>
                  <span className="text-gray-900">{onsiteCheck.bloodPressure ?? '-'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Hemoglobin Level:</span>
                  <span className="text-gray-900">{onsiteCheck.hemoglobinLevel ?? '-'}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Body Temperature:</span>
                  <span className="text-gray-900">{onsiteCheck.bodyTemperature ?? '-'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Weight:</span>
                  <span className="text-gray-900">{onsiteCheck.weight ?? '-'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Can Donate:</span>
                  <span className="text-gray-900">{onsiteCheck.canDonate ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Checked At:</span>
                  <span className="text-gray-900">{onsiteCheck.checkedAt ? new Date(onsiteCheck.checkedAt).toLocaleString() : '-'}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
              <div className="space-y-2">
                {onsiteCheck.createdAt && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="font-semibold">Created:</span>
                    <span className="ml-1">{new Date(onsiteCheck.createdAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {onsiteCheck.updatedAt && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="font-semibold">Updated:</span>
                    <span className="ml-1">{new Date(onsiteCheck.updatedAt).toLocaleString()}</span>
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

export default ViewOnsiteCheckDialog; 