import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "../../../apis/user.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./user-column";
import CreateUserDialog from "./create-user-dialog";
import { toast } from "sonner";

const UserTable = () => {
    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        staleTime: 1000 * 60,
    });
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User deleted successfully");
        },
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Manage users</p>
                </div>
                <CreateUserDialog />
            </div>
            <DataTable
                filter="email"
                columns={columns({ onDelete: mutate })}
                data={users ?? []}
            />
        </div>
    );
};

export default UserTable; 