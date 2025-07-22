import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveUsers, deleteUser } from "@/apis/user.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./user-column";
import CreateUserDialog from "./create-user-dialog";
import { toast } from "sonner";
import { useProfileStore } from "@/store/profileStore";

const UserTable = () => {
  const { profile } = useProfileStore();
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getActiveUsers,
    staleTime: 1000 * 60,
  });

  const filteredUsers = users ?? [];
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
        {profile?.role === "ADMIN" ? (
          <CreateUserDialog />
        ) : (
          <p className="text-muted-foreground">Only admins can create users</p>
        )}
      </div>
      <DataTable
        filter="email"
        columns={columns({ onDelete: mutate })}
        data={filteredUsers}
      />
    </div>
  );
};

export default UserTable;
