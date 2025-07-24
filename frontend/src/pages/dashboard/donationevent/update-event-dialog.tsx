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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  baseEventSchema,
  updateEventSchema,
  type UpdateEventSchema,
} from "./event.schema";
import { updateEvent } from "@/apis/event.api";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Function to get valid status transitions
const getValidStatusOptions = (currentStatus: string): string[] => {
  const allowedTransitions: Record<string, string[]> = {
    "UPCOMING": ["UPCOMING", "ONGOING", "CANCELLED"],
    "ONGOING": ["ONGOING", "ENDED"],
    "ENDED": ["ENDED"], // Only itself (no changes allowed)
    "CANCELLED": ["CANCELLED"] // Only itself (no changes allowed)
  };
  
  return allowedTransitions[currentStatus] || ["UPCOMING", "ONGOING", "ENDED", "CANCELLED"];
};

interface UpdateEventDialogProps {
  currentData: UpdateEventSchema & { _id: string };
}

const UpdateEventDialog = ({ currentData }: UpdateEventDialogProps) => {
  const [open, setOpen] = useState(false);
  const isEventLocked = currentData.status === "ENDED" || currentData.status === "CANCELLED";
  
  const form = useForm<UpdateEventSchema>({
    resolver: zodResolver(updateEventSchema),
  });

  useEffect(() => {
    if (currentData) {
      form.reset({
        ...currentData,
        registrationStartedAt: new Date(currentData.registrationStartedAt),
        registrationEndedAt: new Date(currentData.registrationEndedAt),
        eventStartedAt: new Date(currentData.eventStartedAt),
        eventEndedAt: new Date(currentData.eventEndedAt),
      });
    }
  }, [currentData, form, open]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => updateEvent(currentData._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setOpen(false);
      toast.success("Event updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || error?.response?.data?.error || "Failed to update event");
    },
  });
  const imageFile = form.watch("image");

  const onSubmit = (data: UpdateEventSchema) => {
    const formData = new FormData();
    const { dirtyFields } = form.formState;

    if (dirtyFields.title) formData.append("title", data.title!);
    if (dirtyFields.description)
      formData.append("description", data.description!);
    if (dirtyFields.slot) formData.append("slot", data.slot!.toString());
    if (dirtyFields.location) formData.append("location", data.location!);
    if (dirtyFields.status) formData.append("status", data.status!);
    if (dirtyFields.image && data.image instanceof File) {
      formData.append("image", data.image);
    }
    if (dirtyFields.registrationStartedAt)
      formData.append(
        "registrationStartedAt",
        data.registrationStartedAt!.toISOString()
      );
    if (dirtyFields.registrationEndedAt)
      formData.append(
        "registrationEndedAt",
        data.registrationEndedAt!.toISOString()
      );
    if (dirtyFields.eventStartedAt)
      formData.append("eventStartedAt", data.eventStartedAt!.toISOString());
    if (dirtyFields.eventEndedAt)
      formData.append("eventEndedAt", data.eventEndedAt!.toISOString());

    if (Array.from(formData.keys()).length > 0) {
      mutate(formData);
    } else {
      setOpen(false); // Close if no changes
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
        <Edit className="size-4" />
        Update Event
      </DialogTrigger>
      <DialogContent className="rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Update Event
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            Update the donation event. Edit the details below.
          </DialogDescription>
          {isEventLocked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800 text-center">
                ⚠️ This event is <strong>{currentData.status.toLowerCase()}</strong> and cannot be modified.
              </p>
            </div>
          )}
        </DialogHeader>
        <FormSchemaProvider schema={baseEventSchema}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Event Title" {...field} disabled={isEventLocked} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Event Description" {...field} disabled={isEventLocked} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="registrationStartedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Start</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
                          disablePast={true}
                          disabled={isEventLocked}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registrationEndedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration End</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
                          disablePast={true}
                          disabled={isEventLocked}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="eventStartedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Start</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
                          disablePast={true}
                          disabled={isEventLocked}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventEndedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event End</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
                          disablePast={true}
                          disabled={isEventLocked}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="slot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slot</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Slot" {...field} disabled={isEventLocked} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Location" {...field} disabled={isEventLocked} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                              <FormField
                control={form.control}
                name="status"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isEventLocked}
                      >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getValidStatusOptions(currentData.status).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    {isEventLocked && (
                      <p className="text-xs text-muted-foreground">
                        Status cannot be changed for {currentData.status.toLowerCase()} events
                      </p>
                    )}
                  </FormItem>
                );
                }}
              />
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        disabled={isEventLocked}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("image", file, {
                              shouldValidate: true,
                            });
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    {imageFile && (
                      <img
                        src={
                          typeof imageFile === "string"
                            ? imageFile
                            : URL.createObjectURL(imageFile)
                        }
                        alt="Preview"
                        className="mt-2 h-auto w-full"
                      />
                    )}
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending || isEventLocked}
                className="w-full h-12 text-lg font-bold rounded-lg"
              >
                {isEventLocked ? `Cannot Update ${currentData.status.charAt(0) + currentData.status.slice(1).toLowerCase()} Event` : "Update"}
              </Button>
            </form>
          </Form>
        </FormSchemaProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventDialog;
