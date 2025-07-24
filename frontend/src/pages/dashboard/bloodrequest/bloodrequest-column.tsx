// bloodrequest-column.tsx
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { BloodRequestProps } from "@/apis/bloodrequest.api";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateBloodRequestDialog from "./update-bloodrequest-dialog";
import DeleteBloodRequestDialog from "./delete-bloodrequest-dialog";
import ViewBloodRequestDialog from "./view-bloodrequest-dialog";
import { formatDate } from "@/lib/utils";
import { useProfileStore } from "@/store/profileStore";

interface ActionsProps {
  onDelete: (id: string) => void;
}

export const columns = ({
  onDelete,
}: ActionsProps): ColumnDef<BloodRequestProps>[] => [
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      accessorKey: "name",
      id: "Name",
    },

    {
      accessorKey: "bloodType",
      header: "Blood Type",
    },
    {
      accessorKey: "bloodComponent",
      header: "Blood Component",
    },
    {
      accessorKey: "quantity",
      header: "Quantity (ml)",
      //căn giữa
      cell: ({ row }) => {
        return (
          <div className="ml-7">
            {row.original.quantity}
          </div>
        );
      }
    },

    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        return (
          <div className="max-w-[200px] whitespace-normal break-words">
            {row.original.address}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const getStatusStyle = (status: string) => {
          switch (status?.toUpperCase()) {
            case "PENDING":
              return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "APPROVAL":
              return "bg-green-100 text-green-800 border-green-200";
            case "REJECTED":
              return "bg-red-100 text-red-800 border-red-200";
            case "CANCELLED":
              return "bg-gray-100 text-gray-800 border-gray-200";
            case "FULL_FILLED":
              return "bg-emerald-300 text-emerald-800 border-emerald-200";
            case "IN_PROGRESS":
              return "bg-orange-100 text-orange-800 border-orange-200";
            default:
              return "bg-gray-100 text-gray-800 border-gray-200";
          }
        };

        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(status)}`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Requested Date" />
      ),
      cell: ({ row }) => {
        const formatted = formatDate(new Date(row.original.createdAt));
        return <div className="">{formatted}</div>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated Date" />
      ),
      cell: ({ row }) => {
        const formatted = formatDate(new Date(row.original.updatedAt));
        return <div className="">{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const bloodrequest = row.original;
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
              <DropdownMenuItem asChild>
                <ViewBloodRequestDialog bloodrequest={bloodrequest} />
              </DropdownMenuItem>
              {profile?.role === "STAFF" && (
                <>
                  <DropdownMenuItem asChild>
                    <UpdateBloodRequestDialog currentData={bloodrequest} />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="text-red-600 cursor-pointer">
                    <DeleteBloodRequestDialog
                      callback={() => onDelete(bloodrequest._id)}
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
