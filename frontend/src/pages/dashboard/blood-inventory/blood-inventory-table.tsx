import {useQuery} from "@tanstack/react-query";
import { getBloodSeed} from "../../../apis/bloodInventory.api";
import { DataTable } from "../../../components/data-table";
import { columns } from "./blood-inventory-column";

// import CreateBloodInventoryDialog from "./create-blood-inventory-dialog";

const BloodInventoryTable = () => {
  const { data: bloodTypes } = useQuery({
    queryKey: ["bloodSeed"],
    queryFn: getBloodSeed,
  });
  // const queryClient = useQueryClient();
  // const { mutate } = useMutation({
  //   mutationFn: deleteInventory,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["inventories"] });
  //   },
  // });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blood Inventory Management</h1>
          <p className="text-muted-foreground">Manage your blood inventory records</p>
        </div>
      </div>
      <DataTable
        filter="blood_group"
        columns={columns}
        data={bloodTypes ?? []}
      />
    </div>
  );
};

export default BloodInventoryTable;