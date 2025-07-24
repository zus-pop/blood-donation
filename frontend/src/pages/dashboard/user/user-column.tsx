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
import type { UserProps } from "@/apis/user.api";
import UpdateUserDialog from "./update-user-dialog";
import RestoreUserDialog from "./restore-user-dialog";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { useProfileStore } from "@/store/profileStore";
import DeleteUserDialog from "./delete-user-dialog";

interface ActionsProps {
    onDelete: (id: string) => void;
}

export const columns = ({ onDelete }: ActionsProps): ColumnDef<UserProps>[] => [
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
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.role;
            const getRoleStyle = (role: string | undefined) => {
                switch (role?.toUpperCase()) {
                    case "ADMIN":
                        return "bg-red-100 text-red-800 border-red-200";
                    case "STAFF":
                        return "bg-blue-100 text-blue-800 border-blue-200";
                    case "HOSPITAL":
                        return "bg-green-100 text-green-800 border-green-200";
                    case "MEMBER":
                        return "bg-gray-100 text-gray-800 border-gray-200";
                    default:
                        return "bg-gray-100 text-gray-800 border-gray-200";
                }
            };

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleStyle(role)}`}>
                    {role || "N/A"}
                </span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created Date" />,
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            const formatted = createdAt
                ? formatDate(new Date(createdAt))
                : "N/A";
            return <div className="">{formatted}</div>;
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Updated Date" />,
        cell: ({ row }) => {
            const updatedAt = row.original.updatedAt;
            const formatted = updatedAt
                ? formatDate(new Date(updatedAt))
                : "N/A";
            return <div className="">{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;
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
                        {profile?.role === "ADMIN" && (
                            <>
                                <DropdownMenuItem asChild>
                                    <UpdateUserDialog currentData={user} />
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                {user.isDeleted === true && (() => {
                                    const [open, setOpen] = useState(false);
                                    return <>
                                        <DropdownMenuItem
                                            className="text-green-600 cursor-pointer"
                                            onClick={e => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setOpen(true);
                                            }}
                                        >
                                            Restore
                                        </DropdownMenuItem>
                                        <RestoreUserDialog user={user} open={open} setOpen={setOpen} />
                                    </>;
                                })()}
                                {user.isDeleted === false && (
                                    <DropdownMenuItem asChild className="text-red-600 cursor-pointer">
                                        <DeleteUserDialog
                                            callback={() => onDelete(user._id)}
                                        />
                                    </DropdownMenuItem>
                                )}
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]; 