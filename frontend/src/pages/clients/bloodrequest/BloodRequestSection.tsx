import { useQuery } from "@tanstack/react-query";
import { getBloodRequests } from "@/apis/bloodrequest.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, DropletIcon } from "lucide-react";

export default function BloodRequestSection() {
    const userId = "6841160d511a3b66920c0a80";

    const { data: bloodRequests, isLoading } = useQuery({
        queryKey: ["bloodrequests", userId],
        queryFn: async () => getBloodRequests({ requestedBy: userId }),
    });

    if (isLoading) return <Loading />;

    return (
        <section className="container py-8 space-y-8 items-center">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold tracking-tight text-primary">Your Blood Requests</h2>
            </div>
            {bloodRequests && bloodRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bloodRequests.map((req: any) => (
                        <Card
                            key={req._id}
                            className="rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 bg-white"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between gap-2">
                                    <CardTitle className="text-xl font-semibold text-gray-800">
                                        {req.bloodType} <span className="font-normal text-gray-400">-</span> {req.bloodComponent}
                                    </CardTitle>
                                    <Badge
                                        className={
                                            req.status === 'PENDING'
                                                ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                                                : req.status === 'approved'
                                                    ? 'bg-green-100 text-green-700 border-green-300'
                                                    : 'bg-red-100 text-red-700 border-red-300'
                                        }
                                    >
                                        {req.status.toUpperCase()}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 px-2 pb-4">
                                <div className="flex items-center gap-3 text-gray-500">
                                    <DropletIcon className="h-5 w-5 text-rose-500" />
                                    <span className="font-medium">Quantity:</span>
                                    <span className="text-gray-700">{req.quantity}ml</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-500">
                                    <MapPinIcon className="h-5 w-5 text-blue-500" />
                                    <span className="font-medium">{req.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-500">
                                    <CalendarIcon className="h-5 w-5 text-emerald-500" />
                                    <span className="font-medium">{new Date(req.createdAt).toLocaleString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="rounded-2xl border border-gray-200 shadow-md bg-white">
                    <CardContent className="flex items-center justify-center h-32">
                        <p className="text-muted-foreground">You have no blood requests yet</p>
                    </CardContent>
                </Card>
            )}
        </section>
    );
}