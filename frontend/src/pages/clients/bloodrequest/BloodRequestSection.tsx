import { useQuery } from "@tanstack/react-query";
import { getBloodRequests } from "@/apis/bloodrequest.api";
import Loading from "@/components/loading";
import { CalendarIcon, MapPinIcon, DropletIcon, BeakerIcon, FlaskConicalIcon } from "lucide-react";
import { useProfileStore } from "@/store/profileStore";

// Component for displaying blood component with proper styling
const BloodComponentBadge = ({ component }: { component: string }) => {
    const formatComponent = (comp: string) => {
        return comp.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
            {formatComponent(component)}
        </span>
    );
};

export default function BloodRequestSection() {
    const { profile } = useProfileStore();
    const userId = profile?._id;

    const { data: bloodRequests, isLoading } = useQuery({
        queryKey: ["bloodrequests", userId],
        queryFn: async () => userId ? getBloodRequests({ requestedBy: userId }) : [],
        enabled: !!userId, // Only run query if userId exists
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "APPROVAL":
                return "bg-green-100 text-green-800 border-green-200";
            case "REJECTED":
                return "bg-red-100 text-red-800 border-red-200";
            case "CANCELLED":
                return "bg-gray-100 text-gray-800 border-gray-200";
            case "FULL_FILLED":
                return "bg-emerald-300 text-emerald-800 border-emerald-200";
            case "IN_PROGRESS":
                return "bg-orange-100 text-orange-800 border-orange-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    if (isLoading) return <Loading />;

    if (!profile) {
        return (
            <section className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-primary mb-2">Please Login</h2>
                    <p className="text-gray-600">You need to be logged in to view your blood requests</p>
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-2">Your Blood Requests</h2>
                <p className="text-gray-600">Manage and track your blood donation requests</p>
            </div>

            {bloodRequests && bloodRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bloodRequests.map((req: any) => (
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            {/* Card Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-50 p-2 rounded-full">
                                            <DropletIcon className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-2xl text-red-600">{req.bloodType}</span>
                                            <p className="text-sm text-gray-600">Blood Type</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(req.status)}`}>
                                        {req.status}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FlaskConicalIcon className="w-5 h-5 text-gray-700" />
                                    <span>Component:</span>
                                    <BloodComponentBadge component={req.bloodComponent} />
                                </div>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <BeakerIcon className="w-5 h-5 text-orange-500" />
                                    <span>Quantity: {req.quantity}ml</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPinIcon className="w-5 h-5 text-blue-500" />
                                    <span>{req.address}</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <CalendarIcon className="w-5 h-5 text-green-500" />
                                    <span>{new Date(req.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <DropletIcon className="w-12 h-12 mx-auto" />
                        </div>
                        <p className="text-gray-600">You have no blood requests yet</p>
                        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                            Create New Request
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}