import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  participationSchema,
  type ParticipationSchema,
} from "./participation.schema";
import { createParticipation } from "@/apis/participation.api";

const CreateParticipationDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<ParticipationSchema>({
    resolver: zodResolver(participationSchema),
    defaultValues: {
      userId: "",
      eventId: "",
      status: "REGISTERED",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participations"] });
      setOpen(false);
      form.reset();
    },
  });
  const onSubmit = (data: ParticipationSchema) => {
    const submitData = {
      user: data.userId,
      event: data.eventId,
      status: data.status,
    };
    mutate(submitData);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Create New Participation
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            Create a new participation. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <FormSchemaProvider schema={participationSchema}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">User ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="User ID"
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
                name="eventId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Event ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Event ID"
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Status</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Status"
                        {...field}
                        className="h-12 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Create
              </Button>
            </form>
          </Form>
        </FormSchemaProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateParticipationDialog;
