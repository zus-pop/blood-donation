// BloodRequestTable.tsx
// UI table for blood requests, similar to BlogTable and CategoryTable
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteBloodRequest,
  getBloodRequests,
  type BloodRequestProps,
} from "@/apis/bloodrequest.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./bloodrequest-column";
import CreateBloodRequestDialog from "./create-bloodrequest-dialog";
import { toast } from "sonner";
import { useProfileStore } from "@/store/profileStore";
const BloodRequestTable = () => {
  const { profile } = useProfileStore();
  const { data: bloodrequests = [] } = useQuery<BloodRequestProps[]>({
    queryKey: ["bloodrequests"],
    queryFn: () => getBloodRequests({}),
    staleTime: 1000 * 60,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteBloodRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bloodrequests"] });
      toast.success("Blood request deleted successfully");
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Blood Request Management
          </h1>
          <p className="text-muted-foreground">Manage blood requests</p>
        </div>
        {profile?.role === "STAFF" ? (
          <CreateBloodRequestDialog />
        ) : (
          <p className="text-muted-foreground">
            Only staffs can create blood requests
          </p>
        )}
      </div>
      <DataTable
        filter="Name"
        columns={columns({ onDelete: mutate })}
        data={bloodrequests ?? []}
        initialSorting={[{ id: "createdAt", desc: true }]}
      />
    </div>
  );
};

export default BloodRequestTable;
