import { type ColumnDef } from "@tanstack/react-table";
import type { InventoryProps } from "@/apis/bloodInventory.api";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateBloodInventoryDialog from "./update-blood-inventory-dialog";
import DeleteBloodInventoryDialog from "./delete-blood-inventory-dialog";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { formatDate } from "@/lib/utils";
import { useProfileStore } from "@/store/profileStore";

interface ActionsProps {
  onDelete: (id: string) => void;
}

export const columns = ({
  onDelete,
}: ActionsProps): ColumnDef<InventoryProps>[] => [
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
      accessorKey: "bloodType",
      header: "Blood Type",
      cell: ({ row }) => {
        const bloodType = row.original.bloodType;
        if (typeof bloodType === "object" && bloodType !== null) {
          return bloodType.bloodType;
        }
        return bloodType;
      },
    },
    {
      accessorKey: "Participant", 
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Participant" />
      ),
      cell: ({ row }) => {
        const userId = row.original.userId;
        if (typeof userId === "object" && userId !== null) {
          const fullName = `${userId.firstName || ""} ${userId.lastName || ""}`.trim();
          return fullName || userId.email || "Unknown User";
        }
        
        const p = row.original.participation;
        if (typeof p === "object" && p !== null) {
          const user = (p as any).userId;
          if (typeof user === "object" && user !== null) {
            const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
            return fullName || user.email || "Unknown User";
          }
        }
        
        return "N/A";
      },
    },
    {
      accessorKey: "componentType",
      header: "Component",
      cell: ({ row }) => {
        const component = row.original.componentType;
        return component ? component.replace("_", " ") : "";
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity (ml)",
      cell: ({ row }) => {
        return `${row.original.quantity} ml`;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const getStatusStyle = (status: string) => {
          switch (status?.toLowerCase()) {
            case "available":
              return "bg-green-100 text-green-800 border-green-200";
            case "reserved":
              return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "in_testing":
              return "bg-blue-100 text-blue-800 border-blue-200";
            case "used":
              return "bg-gray-100 text-gray-800 border-gray-200";
            case "expired":
              return "bg-red-100 text-red-800 border-red-200";
            case "quarantined":
              return "bg-purple-100 text-purple-800 border-purple-200";
            default:
              return "bg-gray-100 text-gray-800 border-gray-200";
          }
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
              status
            )}`}
          >
            {status?.replace("_", " ").toUpperCase()}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created Date" />
      ),
      cell: ({ row }) => {
        const createdAt = row.original.createdAt ?? "";
        const formatted = createdAt ? formatDate(new Date(createdAt)) : "";
        return <div className="">{formatted}</div>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => {
        const updatedAt = row.original.updatedAt ?? "";
        const formatted = formatDate(new Date(updatedAt));
        return <div className="">{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const inventory = row.original;
        const { profile } = useProfileStore();

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {profile?.role === "STAFF" && (
                <>
                  <DropdownMenuItem asChild>
                    <UpdateBloodInventoryDialog currentData={inventory} />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="text-red-600 cursor-pointer">
                    <DeleteBloodInventoryDialog
                      callback={() => onDelete(inventory._id)}
                    />
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
