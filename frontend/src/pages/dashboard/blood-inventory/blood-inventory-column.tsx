import { type ColumnDef } from "@tanstack/react-table";
import type { BloodSeedProps } from "../../../apis/bloodInventory.api";
import { Checkbox } from "../../../components/ui/checkbox";

export const columns: ColumnDef<BloodSeedProps>[] = [
  {
    accessorKey: "_id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "blood_group",
    header: "Blood Group",
  },
  {
    accessorKey: "frequency_global",
    header: "Frequency",
  },
  {
    accessorKey: "inventory.rbc.quantity_units",
    header: "RBC Units",
    cell: ({ row }) => row.original.inventory?.rbc?.quantity_units ?? "-",
  },
  {
    accessorKey: "inventory.plasma.quantity_units",
    header: "Plasma Units",
    cell: ({ row }) => row.original.inventory?.plasma?.quantity_units ?? "-",
  },
  {
    accessorKey: "inventory.platelets.quantity_units",
    header: "Platelets Units",
    cell: ({ row }) => row.original.inventory?.platelets?.quantity_units ?? "-",
  },
  {
    accessorKey: "inventory.whole_blood.quantity_units",
    header: "Whole Blood Units",
    cell: ({ row }) => row.original.inventory?.whole_blood?.quantity_units ?? "-",
  },
  
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const inventory = row.original;
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="center">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             {/* <DropdownMenuItem asChild>
//               <UpdateBloodInventoryDialog currentData={inventory} />
//             </DropdownMenuItem>
//             <DropdownMenuSeparator /> */}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
];