import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { participationSchema, type ParticipationSchema } from "./participation.schema";
import { updateParticipation } from "@/apis/participation.api";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

interface UpdateParticipationDialogProps {
  currentData: ParticipationSchema & { _id: string };
}

const UpdateParticipationDialog = ({ currentData }: UpdateParticipationDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<ParticipationSchema>({
    resolver: zodResolver(participationSchema),
  });

  useEffect(() => {
    if (currentData) {
      form.reset(currentData);
    }
  }, [currentData, form, open]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ParticipationSchema) => updateParticipation(currentData._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participations"] });
      setOpen(false);
      toast.success("Cập nhật thành công!");
    },
    onError: () => {
      toast.error("Cập nhật thất bại. Vui lòng thử lại!");
    }
  });

  const onSubmit = (data: ParticipationSchema) => {
    mutate({ userId: currentData.userId, eventId: currentData.eventId, status: data.status });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
        <Edit className="size-4" />
        Update Participation
      </DialogTrigger>
      <DialogContent className="rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Update Participation
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            Update the participation. Edit the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="REGISTERED">REGISTERED</SelectItem>
                        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                        <SelectItem value="ATTENDED">ATTENDED</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateParticipationDialog; 