import { useQuery } from "@tanstack/react-query";
import { getBloodRequests } from "@/apis/bloodrequest.api";
import Loading from "@/components/loading";
import { CalendarIcon, MapPinIcon, DropletIcon } from "lucide-react";

export default function BloodRequestSection() {
    const userId = "68454f13415f3e074938edee";

    const { data: bloodRequests, isLoading } = useQuery({
        queryKey: ["bloodrequests", userId],
        queryFn: async () => getBloodRequests({ requestedBy: userId }),
    });

    if (isLoading) return <Loading />;

    return (
        <section className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-2">Your Blood Requests</h2>
                <p className="text-gray-600">Manage and track your blood donation requests</p>
            </div>

            {bloodRequests && bloodRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bloodRequests.map((req: any) => (
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-semibold">{req.bloodType}</span>
                                    <span className="text-gray-600">WHOLE_BLOOD</span>
                                </div>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                    {req.status}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <DropletIcon className="w-5 h-5 text-red-500" />
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