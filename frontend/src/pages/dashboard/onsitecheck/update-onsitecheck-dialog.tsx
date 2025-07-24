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
import {
  onsiteCheckSchema,
  type OnsiteCheckSchema,
} from "./onsitecheck.schema";
import { updateOnsiteCheck } from "@/apis/onsitecheck.api";
import { toast } from "sonner";

interface UpdateOnsiteCheckDialogProps {
  currentData: OnsiteCheckSchema & { _id: string };
}

const UpdateOnsiteCheckDialog = ({
  currentData,
}: UpdateOnsiteCheckDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<OnsiteCheckSchema>({
    resolver: zodResolver(onsiteCheckSchema),
  });

  useEffect(() => {
    if (currentData) {
      form.reset(currentData);
    }
  }, [currentData, form, open]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: OnsiteCheckSchema) =>
      updateOnsiteCheck(currentData._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onsitechecks"] });
      setOpen(false);
      toast.success("Cập nhật thành công!");
    },
    onError: () => {
      toast.error("Cập nhật thất bại. Vui lòng thử lại!");
    },
  });

  const onSubmit = (data: OnsiteCheckSchema) => {
    mutate({ ...data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
        <Edit className="size-4" />
        Update Onsite Check
      </DialogTrigger>
      <DialogContent className="rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Update Onsite Check
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            Update the onsite check. Edit the details below.
          </DialogDescription>
        </DialogHeader>
        <FormSchemaProvider schema={onsiteCheckSchema}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pulseRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Pulse Rate</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Pulse Rate"
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
                name="bloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Blood Pressure
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Blood Pressure"
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
                name="hemoglobinLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Hemoglobin Level
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Hemoglobin Level"
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
                name="bodyTemperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Body Temperature
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Body Temperature"
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
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Weight</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Weight"
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
                name="canDonate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Can Donate</FormLabel>
                    <FormControl>
                      <Input
                        type="checkbox"
                        checked={!!field.value}
                        readOnly
                        disabled
                      />
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
        </FormSchemaProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOnsiteCheckDialog;
