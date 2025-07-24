import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteParticipationDialog from "./delete-participation-dialog";
import UpdateParticipationDialog from "./update-participation-dialog";
import ViewParticipationDialog from "./view-participation-dialog";
import { useProfileStore } from "@/store/profileStore";

const ParticipationActions = ({ participation, onDelete }: { participation: ParticipationProps; onDelete: (id: string) => void }) => {
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
          <ViewParticipationDialog participation={participation} />
        </DropdownMenuItem>
        {profile?.role === "STAFF" && (
          <>
            <DropdownMenuItem asChild>
              <UpdateParticipationDialog currentData={{
                ...participation,
                userId: participation.user,
                eventId: participation.event
              }} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-red-600 cursor-pointer">
              <DeleteParticipationDialog callback={() => onDelete(participation._id!)} />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export interface ParticipationProps {
  _id: string;
  user: string;
  event: string;
  status: "REGISTERED" | "CANCELLED" | "ATTENDED" | "NOT_ELIGIBLE";
  createdAt?: string;
  updatedAt?: string;
  userName?: string;
  eventName?: string;
  participationId?: string;
}

interface ActionsProps {
  onDelete: (id: string) => void;
}

export const columns = ({
  onDelete,
}: ActionsProps): ColumnDef<ParticipationProps>[] => [
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
    // Hidden column for search
    {
      accessorKey: "userNameForSearch",
      header: () => null,
      cell: () => null,
      enableHiding: true,
      enableSorting: false,
      meta: { hidden: true },
    },
    {
      accessorKey: "participationId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Participation ID" />
      ),
      cell: ({ row }) => row.original.participationId || "",
    },
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
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        let color = "";
        let icon = "";
        switch (status) {
          case "REGISTERED": 
            color = "bg-blue-100 text-blue-700"; 
            icon = "📝";
            break;
          case "ATTENDED": 
            color = "bg-green-100 text-green-700"; 
            icon = "✅";
            break;
          case "CANCELLED": 
            color = "bg-red-100 text-red-700"; 
            icon = "❌";
            break;
          case "NOT_ELIGIBLE": 
            color = "bg-gray-300 text-gray-700"; 
            icon = "⚠️";
            break;
          default: 
            color = "bg-gray-100 text-gray-700";
            icon = "❓";
        }
        return (
          <span className={`px-2 py-1 rounded text-xs font-semibold ${color} flex items-center gap-1 w-fit`}>
            <span>{icon}</span>
            {status === "NOT_ELIGIBLE" ? "Not Eligible" : status}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const participation = row.original;
        return <ParticipationActions participation={participation} onDelete={onDelete} />;
      },
    },
  ]; 