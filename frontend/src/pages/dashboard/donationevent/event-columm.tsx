import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "../../../components/data-table-column-header";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import DeleteEventDialog from "./delete-event-dialog";
import UpdateEventDialog from "./update-event-dialog";
import ViewEventDialog from "./view-event-dialog";

export interface EventProps {
  _id: string;
  title: string;
  description: string;
  registrationStartedAt: string;
  registrationEndedAt: string;
  eventStartedAt: string;
  eventEndedAt: string;
  status: "UPCOMING" | "REGISTRATION" | "ONGOING" | "ENDED" | "CANCELLED";
  createdAt: string;
}

interface ActionsProps {
  onDelete: (id: string) => void;
}

export const columns = ({ onDelete }: ActionsProps): ColumnDef<EventProps>[] => [
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
  { accessorKey: "title", header: ({ column }) => <DataTableColumnHeader column={column} title="Title" /> },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "registrationStartedAt", header: "Registration Start" },
  { accessorKey: "registrationEndedAt", header: "Registration End" },
  { accessorKey: "eventStartedAt", header: "Event Start" },
  { accessorKey: "eventEndedAt", header: "Event End" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "createdAt", header: "Created At" },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;
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
            <DropdownMenuItem asChild>
              <UpdateEventDialog currentData={event} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-red-600 cursor-pointer">
              <DeleteEventDialog callback={() => onDelete(event._id)} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
