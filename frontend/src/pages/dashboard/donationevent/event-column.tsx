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
import DeleteEventDialog from "./delete-event-dialog";
import UpdateEventDialog from "./update-event-dialog";
import ViewEventDialog from "./view-event-dialog";
import { formatDate } from "@/lib/utils";
import { useProfileStore } from "@/store/profileStore";

export interface EventProps {
  _id: string;
  title: string;
  description: string;
  registrationStartedAt: string;
  registrationEndedAt: string;
  eventStartedAt: string;
  eventEndedAt: string;
  slot: number;
  location: string;
  status: "UPCOMING" | "REGISTRATION" | "ONGOING" | "ENDED" | "CANCELLED";
  createdAt: string;
}

interface ActionsProps {
  onDelete: (id: string) => void;
}

export const columns = ({
  onDelete,
}: ActionsProps): ColumnDef<EventProps>[] => [
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
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
    },
    {
      accessorKey: "registrationStartedAt",
      header: "Registration Start",
      cell: ({ row }) =>
        formatDate(new Date(row.original.registrationStartedAt as string), true),
    },
    {
      accessorKey: "registrationEndedAt",
      header: "Registration End",
      cell: ({ row }) =>
        formatDate(new Date(row.original.registrationEndedAt as string), true),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let color = "";
        switch (status) {
          case "UPCOMING": color = "bg-blue-100 text-blue-700"; break;
          case "REGISTRATION": color = "bg-yellow-100 text-yellow-700"; break;
          case "ONGOING": color = "bg-green-100 text-green-700"; break;
          case "ENDED": color = "bg-gray-200 text-gray-700"; break;
          case "CANCELLED": color = "bg-red-100 text-red-700"; break;
          default: color = "bg-gray-100 text-gray-700";
        }
        return <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{status}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const event = row.original;
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
                <ViewEventDialog event={event} />
              </DropdownMenuItem>
              {profile?.role === "STAFF" && (
                <>
                  <DropdownMenuItem asChild>
                    <UpdateEventDialog currentData={event} />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="text-red-600 cursor-pointer">
                    <DeleteEventDialog callback={() => onDelete(event._id)} />
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
