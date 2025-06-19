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
import { Plus } from "lucide-react";
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
import { createEvent } from "../../../apis/event.api";

const statusOptions = [
  "UPCOMING",
  "REGISTRATION",
  "ONGOING",
  "ENDED",
  "CANCELLED",
];

const CreateEventDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      registrationStartedAt: "",
      registrationEndedAt: "",
      eventStartedAt: "",
      eventEndedAt: "",
      status: "UPCOMING",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setOpen(false);
    },
  });
  const onSubmit = (data: EventSchema) => {
    mutate(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Create New Event</DialogTitle>
          <DialogDescription className="text-center mb-4">
            Create a new donation event. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Title" {...field} className="h-12 text-base rounded-lg" />
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
                  <FormLabel className="font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Event Description" {...field} className="h-20 text-base rounded-lg" />
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
                    <FormLabel className="font-semibold">Registration Start</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="h-12 text-base rounded-lg" />
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
                    <FormLabel className="font-semibold">Registration End</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="h-12 text-base rounded-lg" />
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
                    <FormLabel className="font-semibold">Event Start</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="h-12 text-base rounded-lg" />
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
                    <FormLabel className="font-semibold">Event End</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="h-12 text-base rounded-lg" />
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
                  <FormLabel className="font-semibold">Status</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded-lg px-2 py-3 text-base">
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
            <Button type="submit" disabled={isPending} className="w-full h-12 text-lg font-bold rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
