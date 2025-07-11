import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteParticipation, getParticipations } from "@/apis/participation.api";
import { getUsers } from "@/apis/user.api";
import { getEvents } from "@/apis/event.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./participation-column";
import CreateParticipationDialog from "./create-participation-dialog";

const ParticipationTable = () => {
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
    },
  });

  // Map userId, eventId sang tên
  const participationWithNames = (participations ?? []).map((p: any) => {
    const user = users?.find((u) => u._id === p.user);
    const event = events?.find((e) => e._id === p.event);
    return {
      _id: p._id || "",
      user: p.user,
      event: p.event,
      status: p.status,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      userName: user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "",
      eventName: event ? event.title : "",
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Participation Management
          </h1>
          <p className="text-muted-foreground">Manage participations</p>
        </div>
        <CreateParticipationDialog />
      </div>
      <DataTable
        filter="userName"
        columns={columns({
          onDelete: mutate,
        })}
        data={participationWithNames}
      />
    </div>
  );
};

export default ParticipationTable; 