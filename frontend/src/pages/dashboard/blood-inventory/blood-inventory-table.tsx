import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInventories, deleteInventory } from "../../../apis/bloodInventory.api";
import { DataTable } from "../../../components/data-table";
import { columns } from "./blood-inventory-column";
import CreateBloodInventoryDialog from "./create-blood-inventory-dialog";

const BloodInventoryTable = () => {
  const { data: inventories, isLoading } = useQuery({
    queryKey: ["inventories"],
    queryFn: getInventories,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blood Inventory Management</h1>
          <p className="text-muted-foreground">Manage your blood inventory records</p>
        </div>
        <CreateBloodInventoryDialog />
      </div>
      <DataTable
        filter="bloodType"
        columns={columns({ onDelete: mutate })}
        data={inventories ?? []}
      />
    </div>
  );
};

export default BloodInventoryTable;