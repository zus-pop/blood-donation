import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveUsers, getDeletedUsers, deleteUser } from "@/apis/user.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./user-column";
import CreateUserDialog from "./create-user-dialog";
import { toast } from "sonner";
import { useProfileStore } from "@/store/profileStore";
import { Button } from "@/components/ui/button";
import { Trash2, Users } from "lucide-react";


import { useState } from "react";

const UserTable = () => {
  const { profile } = useProfileStore();
  const [showDeleted, setShowDeleted] = useState(false);
  const queryClient = useQueryClient();

  const { data: activeUsers } = useQuery({
    queryKey: ["users", "active"],
    queryFn: getActiveUsers,
    staleTime: 1000 * 60,
    enabled: !showDeleted,
  });

  const { data: deletedUsers } = useQuery({
    queryKey: ["users", "deleted"],
    queryFn: getDeletedUsers,
    staleTime: 1000 * 60,
    enabled: showDeleted,
  });

  const filteredUsers = showDeleted ? deletedUsers ?? [] : activeUsers ?? [];

  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "active"] });
      queryClient.invalidateQueries({ queryKey: ["users", "deleted"] });
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
        <div className="flex items-center gap-2">
          {profile?.role === "ADMIN" && (
            <>
              <Button
                variant={showDeleted ? "secondary" : "secondary"}
                className="flex items-center gap-2 font-semibold shadow-sm border"
                onClick={() => setShowDeleted((prev) => !prev)}
              >
                {showDeleted ? (
                  <>
                    <Users className="w-4 h-4" />
                    Show Active Users
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Show Deleted Users
                  </>
                )}
              </Button>
              <CreateUserDialog />
            </>
          )}
          {profile?.role !== "ADMIN" && (
            <p className="text-muted-foreground">Only admins can create users</p>
          )}
        </div>
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
