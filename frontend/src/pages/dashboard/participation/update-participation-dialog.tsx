import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSchemaProvider,
} from "@/components/ui/form";
import {
  participationSchema,
  type ParticipationSchema,
} from "./participation.schema";
import { updateParticipation } from "@/apis/participation.api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

interface UpdateParticipationDialogProps {
  currentData: ParticipationSchema & { _id: string };
}

const UpdateParticipationDialog = ({
  currentData,
}: UpdateParticipationDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<ParticipationSchema>({
    resolver: zodResolver(participationSchema),
  });

  // Get valid status options based on current status
  const getValidStatusOptions = (currentStatus: string): string[] => {
    switch (currentStatus) {
      case "REGISTERED":
        return ["REGISTERED", "CANCELLED", "ATTENDED", "NOT_ELIGIBLE"];
      case "CANCELLED":
      case "ATTENDED":
        return []; // Cannot change from these statuses
      case "NOT_ELIGIBLE":
        return ["REGISTERED", "CANCELLED", "ATTENDED", "NOT_ELIGIBLE"];
      default:
        return ["REGISTERED", "CANCELLED", "ATTENDED", "NOT_ELIGIBLE"];
    }
  };

  const validStatusOptions = getValidStatusOptions(currentData.status || "");
  const isStatusLocked = validStatusOptions.length === 0;

  useEffect(() => {
    if (currentData) {
      form.reset(currentData);
    }
  }, [currentData, form, open]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ParticipationSchema) =>
      updateParticipation(currentData._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participations"] });
      setOpen(false);
      toast.success("Participation updated successfully!");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.detail || error?.response?.data?.error || error?.message || "Failed to update participation";
      toast.error(`Update failed: ${errorMessage}`);
    },
  });

  const onSubmit = (data: ParticipationSchema) => {
    mutate({
      userId: currentData.userId,
      eventId: currentData.eventId,
      status: data.status,
    });
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
          {isStatusLocked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-600 font-medium">⚠️ Status Locked</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                This participation is in <span className="font-semibold">{currentData.status}</span> status and cannot be modified.
                {currentData.status === "ATTENDED" && " User has completed the donation process."}
                {currentData.status === "CANCELLED" && " This participation has been cancelled."}
              </p>
                             <div className="mt-2">
                 <p className="text-xs text-yellow-600 font-medium">Available transitions:</p>
                 <span className="inline-block px-2 py-1 bg-gray-200 text-gray-500 rounded text-xs mt-1 flex items-center gap-1">
                   <span>🚫</span>
                   None - Final status
                 </span>
               </div>
            </div>
          )}
        </DialogHeader>
        <FormSchemaProvider schema={participationSchema}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Current Status:</span> 
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold flex items-center gap-1 inline-flex">
                    <span>
                      {currentData.status === "REGISTERED" && "📝"}
                      {currentData.status === "CANCELLED" && "❌"}
                      {currentData.status === "ATTENDED" && "✅"}
                      {currentData.status === "NOT_ELIGIBLE" && "⚠️"}
                    </span>
                    {currentData.status}
                  </span>
                </p>
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isStatusLocked}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {validStatusOptions.includes("REGISTERED") && (
                            <SelectItem value="REGISTERED">REGISTERED</SelectItem>
                          )}
                          {validStatusOptions.includes("CANCELLED") && (
                            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                          )}
                          {validStatusOptions.includes("ATTENDED") && (
                            <SelectItem value="ATTENDED">ATTENDED</SelectItem>
                          )}
                          {validStatusOptions.includes("NOT_ELIGIBLE") && (
                            <SelectItem value="NOT_ELIGIBLE">NOT ELIGIBLE</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                    {!isStatusLocked && (
                      <div className="text-sm text-gray-500 mt-2">
                        <p className="font-medium">Status transition rules:</p>
                        <div className="mt-1">
                          <p className="text-xs">From <span className="font-semibold text-blue-600">{currentData.status}</span> can change to:</p>
                                                     <div className="flex flex-wrap gap-1 mt-1">
                             {validStatusOptions.filter(status => status !== currentData.status).map((status) => {
                               const statusIcons: Record<string, string> = {
                                 "REGISTERED": "📝",
                                 "CANCELLED": "❌", 
                                 "ATTENDED": "✅",
                                 "NOT_ELIGIBLE": "⚠️"
                               };
                               return (
                                 <span 
                                   key={status} 
                                   className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1"
                                 >
                                   <span>{statusIcons[status]}</span>
                                   {status}
                                 </span>
                               );
                             })}
                             {validStatusOptions.filter(status => status !== currentData.status).length === 0 && (
                               <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                                 No transitions available
                               </span>
                             )}
                           </div>
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isPending || isStatusLocked}
              >
                {isStatusLocked 
                  ? `Cannot Update ${currentData.status} Status` 
                  : isPending 
                    ? "Updating..." 
                    : "Update"}
              </Button>
            </form>
          </Form>
        </FormSchemaProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateParticipationDialog;
