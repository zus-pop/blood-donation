import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { formatDate } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { lazy } from "react";

const Button = lazy(() =>
  import("@/components/ui/button").then((module) => ({
    default: module.Button,
  }))
);
const Checkbox = lazy(() =>
  import("@/components/ui/checkbox").then((module) => ({
    default: module.Checkbox,
  }))
);
const DropdownMenu = lazy(() =>
  import("@/components/ui/dropdown-menu").then((module) => ({
    default: module.DropdownMenu,
  }))
);
const DropdownMenuContent = lazy(() =>
  import("@/components/ui/dropdown-menu").then((module) => ({
    default: module.DropdownMenuContent,
  }))
);
const DropdownMenuItem = lazy(() =>
  import("@/components/ui/dropdown-menu").then((module) => ({
    default: module.DropdownMenuItem,
  }))
);
const DropdownMenuLabel = lazy(() =>
  import("@/components/ui/dropdown-menu").then((module) => ({
    default: module.DropdownMenuLabel,
  }))
);
const DropdownMenuSeparator = lazy(() =>
  import("@/components/ui/dropdown-menu").then((module) => ({
    default: module.DropdownMenuSeparator,
  }))
);
const DropdownMenuTrigger = lazy(() =>
  import("@/components/ui/dropdown-menu").then((module) => ({
    default: module.DropdownMenuTrigger,
  }))
);

const DeleteEventDialog = lazy(() => import("./delete-event-dialog"));
const UpdateEventDialog = lazy(() => import("./update-event-dialog"));
const ViewEventDialog = lazy(() => import("./view-event-dialog"));

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
  },
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
