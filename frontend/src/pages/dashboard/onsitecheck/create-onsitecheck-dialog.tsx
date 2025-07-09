import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { onsiteCheckSchema, type OnsiteCheckSchema } from "./onsitecheck.schema";
import { createOnsiteCheck } from "@/apis/onsitecheck.api";
import { getParticipations } from "@/apis/participation.api";
import { getUsers } from "@/apis/user.api";
import { getEvents } from "@/apis/event.api";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const CreateOnsiteCheckDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<OnsiteCheckSchema>({
    resolver: zodResolver(onsiteCheckSchema),
    defaultValues: {
      participationId: "",
      pulseRate: undefined,
      bloodPressure: "",
      hemoglobinLevel: undefined,
      bodyTemperature: undefined,
      weight: undefined,
      canDonate: undefined,
      checkedAt: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createOnsiteCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onsitechecks"] });
      setOpen(false);
      form.reset();
    },
  });
  const onSubmit = (data: OnsiteCheckSchema) => {
    mutate({ ...data, participationId: String(data.participationId ?? "") });
  };
  const { data: participations } = useQuery({
    queryKey: ["participations"],
    queryFn: getParticipations,
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Onsite Check
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Create New Onsite Check
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            Create a new onsite check. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="participationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Participation</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select participation" />
                      </SelectTrigger>
                      <SelectContent>
                        {(participations ?? []).map((p) => {
                          const user = (users ?? []).find((u) => u._id === p.user);
                          const event = (events ?? []).find((e) => e._id === p.event);
                          const userName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : p.user;
                          const eventName = event ? event.title : p.event;
                          return (
                            <SelectItem key={p._id} value={String(p._id)}>
                              {userName} - {eventName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pulseRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Pulse Rate</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Pulse Rate" {...field} className="h-12 text-base rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodPressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Blood Pressure</FormLabel>
                  <FormControl>
                    <Input placeholder="Blood Pressure" {...field} className="h-12 text-base rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hemoglobinLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Hemoglobin Level</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Hemoglobin Level" {...field} className="h-12 text-base rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bodyTemperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Body Temperature</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Body Temperature" {...field} className="h-12 text-base rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Weight</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Weight" {...field} className="h-12 text-base rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="canDonate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Can Donate</FormLabel>
                  <FormControl>
                    <Input type="checkbox" checked={!!field.value} readOnly disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Checked At</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} className="h-12 text-base rounded-lg" />
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateOnsiteCheckDialog; 