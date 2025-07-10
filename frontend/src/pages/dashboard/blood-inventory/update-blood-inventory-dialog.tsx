import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateInventory } from "@/apis/bloodInventory.api";
import { getBloodTypes } from "@/apis/bloodType.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bloodInventorySchema } from "./blood-inventory-schema";
import type { BloodInventoryForm } from "./blood-inventory-schema";
import { toast } from "sonner";

type BloodType = {
  _id: string;
  bloodType: string;
};

const COMPONENT_TYPES = ["WHOLE_BLOOD", "PLASMA", "PLATELETS", "RBC"];
const STATUS_OPTIONS = [
  { value: "available", label: "Available", color: "bg-green-100 text-green-800" },
  { value: "reserved", label: "Reserved", color: "bg-yellow-100 text-yellow-800" },
  { value: "in_testing", label: "In Testing", color: "bg-blue-100 text-blue-800" },
  { value: "used", label: "Used", color: "bg-gray-100 text-gray-800" },
  { value: "expired", label: "Expired", color: "bg-red-100 text-red-800" },
  { value: "quarantined", label: "Quarantined", color: "bg-purple-100 text-purple-800" },
];

const UpdateBloodInventoryDialog = ({ currentData }: { currentData: any }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<BloodInventoryForm>({
    resolver: zodResolver(bloodInventorySchema),
    defaultValues: {
      bloodType: "",
      participation: "",
      componentType: "",
      quantity: 1,
      status: undefined,
    },
  });

  // Update form when dialog opens with current data
  useEffect(() => {
    if (open && currentData) {
      form.reset({
        bloodType: currentData.bloodType?._id || currentData.bloodType || "",
        participation: currentData.participation?._id || currentData.participation || "",
        componentType: currentData.componentType,
        quantity: currentData.quantity,
        status: currentData.status,
      });
    }
  }, [open, currentData, form]);

  const { data: bloodTypes = [] } = useQuery({
    queryKey: ["bloodTypes"],
    queryFn: getBloodTypes,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: BloodInventoryForm) =>
      updateInventory(currentData._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      setOpen(false);
      form.reset();
      toast.success("Blood inventory updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update blood inventory");
      console.error("Update error:", error);
    },
  });

  function onSubmit(data: BloodInventoryForm) {
    console.log("Update payload:", data);
    mutate({ ...data, quantity: Number(data.quantity) });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 w-full py-2 rounded-md hover:bg-gray-200 text-sm">
        <Edit className="size-4" />
        Update
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Blood Inventory</DialogTitle>
          <DialogDescription>
            Update the blood inventory details below. Changes will be reflected immediately.
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
              name="participation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participation ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Participation ID" {...field} />
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
                  <FormLabel>Quantity (ml)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter quantity"
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
                {isPending ? "Updating..." : "Update Inventory"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBloodInventoryDialog;
