import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInventories, deleteInventory } from "@/apis/bloodInventory.api";
import { getUsers } from "@/apis/user.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./blood-inventory-column";
import CreateBloodInventoryDialog from "./create-blood-inventory-dialog";
import { useProfileStore } from "@/store/profileStore";

const BloodInventoryTable = () => {
  const { profile } = useProfileStore();
  const { data: inventories, isLoading } = useQuery({
    queryKey: ["inventories"],
    queryFn: getInventories,
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const inventoryWithUserNames = (inventories ?? [])
    .map((inventory: any) => {
      let userName = "";
      if (inventory.userId) {
        if (typeof inventory.userId === "object") {
          userName = `${inventory.userId.firstName || ""} ${
            inventory.userId.lastName || ""
          }`.trim();
        } else {
          const user = users?.find((u) => u._id === inventory.userId);
          userName = user
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : "";
        }
      }

      if (
        !userName &&
        inventory.participation &&
        typeof inventory.participation === "object"
      ) {
        const user = inventory.participation.userId;
        if (typeof user === "object" && user !== null) {
          userName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
        }
      }

      return {
        ...inventory,
        userName: userName || "Unknown User",
      };
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
            Blood Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Manage your blood inventory records
          </p>
        </div>
        {profile?.role === "STAFF" ? (
          <CreateBloodInventoryDialog />
        ) : (
          <p className="text-muted-foreground">
            Only staffs can create blood inventory records
          </p>
        )}
      </div>
      <DataTable
        filter="bloodType"
        columns={columns({ onDelete: mutate })}
        data={inventoryWithUserNames}
      />
    </div>
  );
};

export default BloodInventoryTable;
