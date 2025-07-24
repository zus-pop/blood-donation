import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import DeleteOnsiteCheckDialog from "./delete-onsitecheck-dialog";
import UpdateOnsiteCheckDialog from "./update-onsitecheck-dialog";
import ViewOnsiteCheckDialog from "./view-onsitecheck-dialog";
import { useProfileStore } from "@/store/profileStore";

export interface OnsiteCheckProps {
  _id: string;
  participationId: string;
  pulseRate?: number;
  bloodPressure?: string;
  hemoglobinLevel?: number;
  bodyTemperature?: number;
  weight?: number;
  canDonate?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userName?: string;
  eventName?: string;
}

interface ActionsProps {
  onDelete: (id: string) => void;
}

export const columns = ({
  onDelete,
}: ActionsProps): ColumnDef<OnsiteCheckProps>[] => [
    // {
    //   accessorKey: "_id",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "userName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      cell: ({ row }) => row.original.userName || "",
    },
    {
      accessorKey: "eventName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Event" />
      ),
      cell: ({ row }) => row.original.eventName || "",
    },
    {
      accessorKey: "pulseRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pulse Rate" />
      ),
    },
    {
      accessorKey: "bloodPressure",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Blood Pressure" />
      ),
    },
    {
      accessorKey: "hemoglobinLevel",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hemoglobin Level" />
      ),
    },
    {
      accessorKey: "bodyTemperature",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Body Temperature" />
      ),
    },
    {
      accessorKey: "weight",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Weight" />
      ),
    },
    {
      accessorKey: "canDonate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Can Donate" />
      ),
      cell: ({ row }) => {
        const canDonate = row.original.canDonate;
        return canDonate ? (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1 w-fit">
            <span>✅</span>
            Yes
          </span>
        ) : (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1 w-fit">
            <span>❌</span>
            No
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const onsiteCheck = row.original;
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
                <ViewOnsiteCheckDialog onsiteCheck={onsiteCheck} />
              </DropdownMenuItem>
              {profile?.role === "STAFF" && (
                <>
                  <DropdownMenuItem asChild>
                    <UpdateOnsiteCheckDialog currentData={onsiteCheck} />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="text-red-600 cursor-pointer">
                    <DeleteOnsiteCheckDialog callback={() => onDelete(onsiteCheck._id)} />
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ]; 