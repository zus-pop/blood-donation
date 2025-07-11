import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInventories, deleteInventory } from "@/apis/bloodInventory.api";
import { getUsers } from "@/apis/user.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./blood-inventory-column";
import CreateBloodInventoryDialog from "./create-blood-inventory-dialog";

const BloodInventoryTable = () => {
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

  // Map userId to user names (handles both participation and direct user references)
  const inventoryWithUserNames = (inventories ?? [])
    .map((inventory: any) => {
      let userName = "";

      // First try to get user from direct userId
      if (inventory.userId) {
        const user = users?.find((u) => u._id === inventory.userId);
        userName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "";
      }

      // If no direct user found, try from participation
      if (!userName && inventory.participation && typeof inventory.participation === "object") {
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
    .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Blood Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Manage your blood inventory records
          </p>
        </div>
        <CreateBloodInventoryDialog />
      </div>
      <DataTable
        filter="userName"
        columns={columns({ onDelete: mutate })}
        data={inventoryWithUserNames}
      />
    </div>
  );
};

export default BloodInventoryTable;
