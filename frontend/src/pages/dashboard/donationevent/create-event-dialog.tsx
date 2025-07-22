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
import { Plus } from "lucide-react";
import { useState } from "react";
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
  createEventSchema,
  type EventSchema,
} from "./event.schema";
import { createEvent } from "@/apis/event.api";
import { DateTimePicker } from "@/components/ui/date-time-picker";

const CreateEventDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<EventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "UPCOMING",
      location: "Thu Duc City",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setOpen(false);
      form.reset();
    },
  });
  const imageFile = form.watch("image");
  const onSubmit = (event: EventSchema) => {
    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append(
      "registrationStartedAt",
      event.registrationStartedAt.toISOString()
    );
    formData.append(
      "registrationEndedAt",
      event.registrationEndedAt.toISOString()
    );
    formData.append("eventStartedAt", event.eventStartedAt.toISOString());
    formData.append("eventEndedAt", event.eventEndedAt.toISOString());
    formData.append("slot", event.slot.toString());
    formData.append("location", event.location || "Thu Duc City");
    if (event.image) formData.append("image", event.image as File);
    mutate(formData);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Create New Event
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            Create a new donation event. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <FormSchemaProvider schema={baseEventSchema}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Event Title"
                        {...field}
                        className="h-12 text-base rounded-lg"
                      />
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
                      <Textarea
                        placeholder="Event Description"
                        {...field}
                        className="h-20 text-base rounded-lg"
                      />
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
                      <FormLabel className="font-semibold">
                        Registration Start
                      </FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
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
                      <FormLabel className="font-semibold">
                        Registration End
                      </FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
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
                      <FormLabel className="font-semibold">
                        Event Start
                      </FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
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
                      <FormLabel className="font-semibold">Event End</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
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
                      <FormLabel className="font-semibold">Slot</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Slot"
                          {...field}
                          className="h-12 text-base rounded-lg"
                        />
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
                      <FormLabel className="font-semibold">Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Location"
                          {...field}
                          className="h-12 text-base rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel aria-required className="font-semibold">
                      Image
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
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
                disabled={isPending}
                className="w-full h-12 text-lg font-bold rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
              >
                Create
              </Button>
            </form>
          </Form>
        </FormSchemaProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
