import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface BloodRequest {
    _id: string;
    user: User;
    bloodType: string;
    bloodComponent: string;
    quantity: number;
    status: string;
    address: string;
    createdAt: string;
}

export default function BloodRequests() {
    const [requests, setRequests] = useState<BloodRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/bloodrequest")
            .then((res) => res.json())
            .then((data) => {
                setRequests(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Blood Requests Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Blood Type</TableHead>
                                    <TableHead>Component</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Created At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <Skeleton className="h-6 w-full" />
                                        </TableCell>
                                    </TableRow>
                                ) : requests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            No data
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    requests.map((req) => (
                                        <TableRow key={req._id}>
                                            <TableCell>{req.user?.name || "N/A"}</TableCell>
                                            <TableCell>{req.bloodType}</TableCell>
                                            <TableCell>{req.bloodComponent}</TableCell>
                                            <TableCell>{req.quantity}</TableCell>
                                            <TableCell>{req.status}</TableCell>
                                            <TableCell>{req.address}</TableCell>
                                            <TableCell>
                                                {new Date(req.createdAt).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}