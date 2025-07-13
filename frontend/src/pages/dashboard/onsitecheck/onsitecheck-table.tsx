import { deleteOnsiteCheck, getOnsiteChecks } from "@/apis/onsitecheck.api";
import { getParticipations } from "@/apis/participation.api";
import { getUsers } from "@/apis/user.api";
import { DataTable } from "@/components/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateOnsiteCheckDialog from "./create-onsitecheck-dialog";
import { columns } from "./onsitecheck-column";
import { useProfileStore } from "../../../store/profileStore";

const OnsiteCheckTable = () => {
  const { profile } = useProfileStore();
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

  const onsiteChecksMapped = (onsiteChecks ?? [])
    .filter(
      (item) =>
        !!item &&
        item.participationId &&
        (typeof item.participationId === "string" ||
          (typeof item.participationId === "object" &&
            item.participationId !== null)) &&
        item._id
    )
    .map((item) => {
      let userName = "";
      let eventName = "";
      // Nếu participationId đã populate
      if (
        item.participationId &&
        typeof item.participationId === "object" &&
        "userId" in item.participationId
      ) {
        const userObj = item.participationId.userId;
        if (userObj && typeof userObj === "object") {
          userName = `${userObj.firstName || ""} ${
            userObj.lastName || ""
          }`.trim();
        } else if (typeof userObj === "string") {
          userName = userObj;
        }
        // Lấy tên event nếu đã populate
        if ("eventId" in item.participationId) {
          const eventObj = item.participationId.eventId;
          if (eventObj && typeof eventObj === "object" && "title" in eventObj) {
            eventName = (eventObj as any).title;
          } else if (typeof eventObj === "string") {
            eventName = eventObj;
          }
        }
      }
      // Nếu chưa populate, fallback về cách cũ
      if ((!userName || !eventName) && participations && users) {
        const participationId = String(item.participationId ?? "");
        const participation = (participations ?? []).find(
          (p) => String(p._id) === participationId
        );
        const userId = participation ? participation.user : "";
        const user = (users ?? []).find(
          (u) => String(u._id) === String(userId)
        );
        userName = user
          ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
          : String(userId);
        // Lấy tên event
        const eventId = participation ? participation.event : "";
        eventName = eventId;
      }
      return {
        ...item,
        _id: String(item._id ?? ""),
        participationId:
          typeof item.participationId === "object" &&
          "_id" in item.participationId
            ? item.participationId._id
            : String(item.participationId ?? ""),
        userName,
        eventName,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
    );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Onsite Check Management
          </h1>
          <p className="text-muted-foreground">Manage onsite checks</p>
        </div>
        {profile?.role === "STAFF" ? (
          <CreateOnsiteCheckDialog />
        ) : (
          <p className="text-muted-foreground">
            Only staffs can create onsite checks
          </p>
        )}
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
