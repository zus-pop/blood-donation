import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { eventSchema, type EventSchema } from "./event.schema";
import { updateEvent } from "../../../apis/event.api";

const statusOptions = [
  "UPCOMING",
  "REGISTRATION",
  "ONGOING",
  "ENDED",
  "CANCELLED",
];

interface UpdateEventDialogProps {
  currentData: EventSchema & { _id: string };
}

const formatDateForInput = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  // Format to YYYY-MM-DDTHH:mm
  return date.toISOString().slice(0, 16);
};

const UpdateEventDialog = ({ currentData }: UpdateEventDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: currentData.title,
      description: currentData.description,
      registrationStartedAt: formatDateForInput(
        currentData.registrationStartedAt
      ),
      registrationEndedAt: formatDateForInput(currentData.registrationEndedAt),
      eventStartedAt: formatDateForInput(currentData.eventStartedAt),
      eventEndedAt: formatDateForInput(currentData.eventEndedAt),
      status: currentData.status,
      slot: currentData.slot,
      location: currentData.location,
      image: currentData.image,
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => updateEvent(currentData._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setOpen(false);
    },
  });
  const imageFile = form.watch("image");
  const onSubmit = (event: EventSchema) => {
    const formData = new FormData();
    const changedFields = form.formState.dirtyFields;

    Object.keys(event).forEach((key) => {
      const field = key as keyof EventSchema;
      if (changedFields[field]) {
        const value = event[field];
        if (value instanceof File) {
          formData.append(field, value);
        } else if (typeof value === "number") {
          formData.append(field, value.toString());
        } else if (typeof value === "string") {
          formData.append(field, value);
        }
      }
    });

    if (formData.entries().next().value) {
      mutate(formData);
    } else {
      setOpen(false); // Close if no changes
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 rounded-md cursor-none hover:bg-gray-200">
        <Edit className="size-5" />
        Update Event
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Update the donation event. Edit the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Title" {...field} />
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
                    <Textarea placeholder="Event Description" {...field} />
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
                      <Input type="datetime-local" {...field} />
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
                      <Input type="datetime-local" {...field} />
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
                      <Input type="datetime-local" {...field} />
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
                      <Input type="datetime-local" {...field} />
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
                      <Input type="number" placeholder="Slot" {...field} />
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
                      <Input placeholder="Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded px-2 py-1">
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          form.setValue("image", file, { shouldValidate: true });
                        }
                      }}
                    />
                  </FormControl>
                  {form.formState.errors.image && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.image.message}
                    </p>
                  )}
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
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventDialog;
