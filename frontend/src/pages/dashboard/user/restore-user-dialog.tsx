import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/apis/user.api";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";
import { toast } from "sonner";
import type { UserProps } from "@/apis/user.api";

interface RestoreUserDialogProps {
    user: UserProps;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const RestoreUserDialog = ({ user, open, setOpen }: RestoreUserDialogProps) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: () => updateUser(user._id, { isDeleted: false }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users", "active"] });
            queryClient.invalidateQueries({ queryKey: ["users", "deleted"] });
            setOpen(false);
            toast.success("User restored successfully");
        },
        onError: () => {
            toast.error("Restore failed");
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Restore User</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to restore this user?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center mt-4">
                    <Button
                        onClick={() => mutate()}
                        disabled={isPending}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        variant="outline"
                    >
                        {isPending ? <Loading inline message="Restoring..." /> : "Confirm Restore"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RestoreUserDialog;
