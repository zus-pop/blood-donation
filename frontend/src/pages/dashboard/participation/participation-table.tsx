import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteParticipation,
  getParticipations,
} from "@/apis/participation.api";
import { getUsers } from "@/apis/user.api";
import { getEvents } from "@/apis/event.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./participation-column";
import CreateParticipationDialog from "./create-participation-dialog";
import type { ParticipationProps as ApiParticipationProps } from "@/apis/participation.api";
import type { ParticipationProps } from "./participation-column";
import { useProfileStore } from "@/store/profileStore";
import { toast } from "sonner";

const ParticipationTable = () => {
  const { profile } = useProfileStore();
  const { data: participations } = useQuery({
    queryKey: ["participations"],
    queryFn: getParticipations,
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participations"] });
      toast.success("Participation deleted successfully");  
    },
    onError: () => {
      toast.error("Failed to delete participation");
    },
  });

  // Map userId, eventId sang tên
  const participationWithNames = (participations ?? [])
    .map((p: ApiParticipationProps) => {
      const user = users?.find((u) => u._id === p.user);
      const event = events?.find((e) => e._id === p.event);
      const userName = user
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : "";
      const participationId = p._id ? String(p._id) : "";
      return {
        _id: participationId,
        user: p.user,
        event: p.event,
        status: p.status,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        userName,
        eventName: event ? event.title : "",
        participationId,
        userNameForSearch: (userName + " " + participationId).toLowerCase(),
      } as ParticipationProps & { userNameForSearch: string };
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
    );

  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Participation Management
          </h1>
          <p className="text-muted-foreground">Manage participations</p>
        </div>
        {profile?.role === "STAFF" ? (
          <CreateParticipationDialog />
        ) : (
          <p className="text-muted-foreground">
            Only staffs can manage participations
          </p>
        )}
      </div>
      <DataTable
        filter="userNameForSearch"
        columns={columns({
          onDelete: mutate,
        })}
        data={participationWithNames}
      />
    </div>
  );
};

export default ParticipationTable;
