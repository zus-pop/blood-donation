import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInventory } from "@/apis/bloodInventory.api";
import { getBloodTypes } from "@/apis/bloodType.api";
import { getUsers } from "@/apis/user.api";
// import { getParticipations } from "@/apis/participation.api";
// import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bloodInventorySchema } from "./blood-inventory-schema";
import type { BloodInventoryForm } from "./blood-inventory-schema";

type BloodType = {
  _id: string;
  bloodType: string;
};

type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
};

const COMPONENT_TYPES = ["WHOLE_BLOOD", "PLASMA", "PLATELETS", "RBC"];
const STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Available", color: "bg-green-100 text-green-800" },
  { value: "RESERVED", label: "Reserved", color: "bg-yellow-100 text-yellow-800" },
  { value: "USED", label: "Used", color: "bg-gray-100 text-gray-800" },
  { value: "EXPIRED", label: "Expired", color: "bg-red-100 text-red-800" },
];

const CreateBloodInventoryDialog = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<BloodInventoryForm>({
    resolver: zodResolver(bloodInventorySchema),
    defaultValues: {
      bloodType: "",
      userId: "",
      componentType: "",
      quantity: 1,
      status: undefined,
    },
  });

  const { data: bloodTypes = [], isLoading: bloodTypesLoading } = useQuery({
    queryKey: ["bloodTypes"],
    queryFn: getBloodTypes,
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // const { data: participations = [] } = useQuery({
  //   queryKey: ["participations"],
  //   queryFn: getParticipations,
  // });

  const { mutate, isPending } = useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      setOpen(false);
      form.reset();
    },
  });

  function onSubmit(data: BloodInventoryForm) {
    // Simple submission without participation logic
    const submitData = {
      ...data,
      quantity: Number(data.quantity),
    };

    console.log("Submitting data:", submitData);
    mutate(submitData);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Inventory
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Blood Inventory</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new blood inventory record.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      disabled={bloodTypesLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodTypes.map((type: BloodType) => (
                          <SelectItem key={type._id} value={type._id}>
                            {type.bloodType}
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
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donor</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={usersLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select donor" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user: User) => (
                          <SelectItem key={user._id} value={user._id}>
                            {user.firstName || ""} {user.lastName || ""} ({user.email})
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
              name="componentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Component Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select component type" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPONENT_TYPES.map((comp) => (
                          <SelectItem key={comp} value={comp}>
                            {comp.replace("_", " ")}
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
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded text-xs ${status.color}`}>
                                {status.label}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBloodInventoryDialog;
