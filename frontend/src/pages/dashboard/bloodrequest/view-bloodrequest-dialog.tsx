// view-bloodrequest-dialog.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Eye, Tag, Layers, Hash, Clock, MapPin } from "lucide-react";
import type { BloodRequestProps } from "../../../apis/bloodrequest.api";
import { Separator } from "../../../components/ui/separator";
import { formatDate } from "../../../lib/utils";

interface ViewBloodRequestDialogProps {
    bloodrequest: BloodRequestProps;
}

// Helper for status color
const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVAL: "bg-blue-100 text-blue-800",
    REJECTED: "bg-red-100 text-red-800",
    CANCELLED: "bg-gray-100 text-gray-800",
    MATCHED: "bg-green-100 text-green-800",
    FULL_FILLED: "bg-green-200 text-green-900",
    IN_PROGRESS: "bg-purple-100 text-purple-800",
};

const ViewBloodRequestDialog = ({ bloodrequest }: ViewBloodRequestDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 rounded-md cursor-none hover:bg-gray-200">
                <Eye className="size-5" />
                View
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl mb-2">
                        Blood Request Details
                    </DialogTitle>
                </DialogHeader>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                        <div className="flex items-center gap-2 text-base">
                            <Eye className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Requested By:</span>
                        </div>
                        <div className="ml-7 text-gray-700">
                            {bloodrequest.user.email}<br/>
                            <span className="text-xs text-gray-500">{bloodrequest.user.firstName} {bloodrequest.user.lastName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-base mt-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Requested Date:</span>
                        </div>
                        <div className="ml-7 text-gray-700">
                            {formatDate(new Date(bloodrequest.createdAt))}
                        </div>
                        <div className="flex items-center gap-2 ">
                            <MapPin className="text-pink-500" />
                            <span className="font-semibold">Address:</span>
                        </div>
                        <div className="ml-7 whitespace-pre-line text-gray-700">{bloodrequest.address}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                        <div className="flex items-center gap-2 text-base">
                            <Tag className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Blood Type:</span>
                        </div>
                        <div className="ml-7 text-gray-700">{bloodrequest.bloodType}</div>
                        <div className="flex items-center gap-2 text-base mt-2">
                            <Layers className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Component:</span>
                        </div>
                        <div className="ml-7 text-gray-700">{bloodrequest.bloodComponent}</div>
                        <div className="flex items-center gap-2 text-base mt-2">
                            <Hash className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Quantity:</span>
                        </div>
                        <div className="ml-7 text-gray-700">{bloodrequest.quantity}</div>
                        <div className="flex items-center gap-2 text-base mt-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Status:</span>
                        </div>
                        <div className="ml-7 text-gray-700">
                            <span className={`px-2 py-1 rounded-full text-sm font-bold ${statusColor[bloodrequest.status as keyof typeof statusColor]}`}>
                                {bloodrequest.status}
                            </span>
                        </div>
                    </div>
                </div>
               
            </DialogContent>
        </Dialog>
    );
};

export default ViewBloodRequestDialog;
