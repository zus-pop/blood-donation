// BloodRequestTable.tsx
// UI table for blood requests, similar to BlogTable and CategoryTable
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBloodRequest, getBloodRequests } from "../../../apis/bloodrequest.api";
import { DataTable } from "../../../components/data-table";
import { columns } from "./bloodrequest-column";
import CreateBloodRequestDialog from "./create-bloodrequest-dialog";

const BloodRequestTable = () => {
    const { data: bloodrequests } = useQuery({
        queryKey: ["bloodrequests"],
        queryFn: getBloodRequests,
    });
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteBloodRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bloodrequests"] });
        },
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blood Request Management</h1>
                    <p className="text-muted-foreground">Manage blood requests</p>
                </div>
                <CreateBloodRequestDialog />
            </div>
            <DataTable
                filter="Email"
                columns={columns({ onDelete: mutate })}
                data={bloodrequests ?? []}
            />
        </div>
    );
};

export default BloodRequestTable;
