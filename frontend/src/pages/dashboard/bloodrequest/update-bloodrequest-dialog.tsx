// update-bloodrequest-dialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useQuery as useUserQuery,
} from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  updateBloodRequest,
  type BloodRequestProps,
} from "@/apis/bloodrequest.api";
import Loading from "@/components/loading";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  bloodRequestSchema,
  type BloodRequestSchema,
} from "./bloodrequest.schema";
import { getUsers } from "@/apis/user.api";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const BLOOD_COMPONENTS = [
  "WHOLE_BLOOD",
  "PLASMA",
  "PLATELETS",
  "RED_CELLS",
  "WHITE_CELLS",
];
const STATUS_OPTIONS = [
  "PENDING",
  "APPROVAL",
  "REJECTED",
  "CANCELLED",
  "FULL_FILLED",
  "IN_PROGRESS",
];

const UpdateBloodRequestDialog = ({
  currentData,
}: {
  currentData: BloodRequestProps;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { data: users = [] } = useUserQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60,
  });

  const form = useForm<BloodRequestSchema>({
    resolver: zodResolver(bloodRequestSchema),
    defaultValues: {
      name: currentData.name,
      phone: currentData.phone,
      requestedBy: currentData.requestedBy._id,
      bloodType: currentData.bloodType,
      bloodComponent: currentData.bloodComponent,
      quantity: currentData.quantity,
      status: currentData.status,
      address: currentData.address,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BloodRequestSchema }) =>
      updateBloodRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bloodrequests"] });
      setOpen(false);
      form.reset();
      toast.success("Blood request updated successfully");
    },
  });

  function onSubmit(data: BloodRequestSchema) {
    mutate({ id: currentData._id, data });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 rounded-md cursor-none hover:bg-gray-200">
        <Edit className="size-5" />
        Update
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Blood Request</DialogTitle>
          <DialogDescription>
            Update the blood request details below.
          </DialogDescription>
        </DialogHeader>
        <FormSchemaProvider schema={bloodRequestSchema}>
          <Form {...form}>
            <div className="h-[70vh] overflow-y-auto p-4 border rounded-md">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="requestedBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={(val) => {
                            field.onChange(val);
                            // Auto fill name when user is selected
                            const selectedUser = users.find(
                              (user) => user._id === val
                            );
                            if (selectedUser) {
                              form.setValue(
                                "name",
                                `${selectedUser.firstName} ${selectedUser.lastName}`
                              );
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map((user) => (
                              <SelectItem key={user._id} value={user._id}>
                                {user.email} ({user.firstName} {user.lastName})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                          <SelectContent>
                            {BLOOD_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodComponent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Component</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select blood component" />
                          </SelectTrigger>
                          <SelectContent>
                            {BLOOD_COMPONENTS.map((comp) => (
                              <SelectItem key={comp} value={comp}>
                                {comp}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity (ml)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Address..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <Button className="text-xl" type="submit">
                    <span className="p-2">
                      {isPending ? (
                        <Loading inline message="Updating..." />
                      ) : (
                        <span>Submit</span>
                      )}
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </Form>
        </FormSchemaProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBloodRequestDialog;
