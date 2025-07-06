import { deleteOnsiteCheck, getOnsiteChecks } from "@/apis/onsitecheck.api";
import { getParticipations } from "@/apis/participation.api";
import { getUsers } from "@/apis/user.api";
import { DataTable } from "@/components/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateOnsiteCheckDialog from "./create-onsitecheck-dialog";
import { columns } from "./onsitecheck-column";

const OnsiteCheckTable = () => {
  const { data: onsiteChecks } = useQuery({
    queryKey: ["onsitechecks"],
    queryFn: getOnsiteChecks,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteOnsiteCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onsitechecks"] });
    },
  });

  const { data: participations } = useQuery({
    queryKey: ["participations"],
    queryFn: getParticipations,
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  //   console.log("onsiteChecks", onsiteChecks);
  //   console.log("participations", participations);
  //   console.log("users", users);

  if (!participations || !users) {
    return <div>Loading...</div>;
  }

  const onsiteChecksMapped = (onsiteChecks ?? []).map((item) => {
    const participationId = String(item.participationId ?? "");
    const participation = (participations ?? []).find(
      (p) => String(p._id) === participationId
    );
    const userId = participation ? participation.userId : "";
    const user = (users ?? []).find((u) => String(u._id) === String(userId));
    const userName = user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : String(userId);
    return {
      ...item,
      _id: String(item._id ?? ""),
      participationId,
      userName,
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Onsite Check Management
          </h1>
          <p className="text-muted-foreground">Manage onsite checks</p>
        </div>
        <CreateOnsiteCheckDialog />
      </div>
      <DataTable
        filter="userName"
        columns={columns({
          onDelete: mutate,
        })}
        data={onsiteChecksMapped}
      />
    </div>
  );
};

export default OnsiteCheckTable;
