import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateInventory } from "../../../apis/bloodInventory.api";
import { getBloodTypes } from "../../../apis/bloodType.api";
import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../../../components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bloodInventorySchema } from "./blood-inventory-schema";
import type { BloodInventoryForm } from "./blood-inventory-schema";
// Define BloodType type locally if not exported from the API module
type BloodType = {
    _id: string;
    bloodType: string;
};

const COMPONENT_TYPES = ["WHOLE_BLOOD", "PLASMA", "PLATELETS", "RBC"];
const STATUS_OPTIONS = ["available", "reserved", "in_testing", "used"];

const UpdateBloodInventoryDialog = ({ currentData }: { currentData: any }) => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const form = useForm<BloodInventoryForm>({
        resolver: zodResolver(bloodInventorySchema),
        defaultValues: {
            bloodType: currentData.bloodType?._id || currentData.bloodType || "",
            participation: currentData.participation?._id || currentData.participation || "",
            componentType: currentData.componentType,
            quantity: currentData.quantity,
            status: currentData.status,
        },
    });

    const { data: bloodTypes = []} = useQuery({
        queryKey: ["bloodTypes"],
        queryFn: getBloodTypes,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: BloodInventoryForm) => updateInventory(currentData._id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inventories"] });
            setOpen(false);
            form.reset();
        },
    });

    function onSubmit(data: BloodInventoryForm) {
        console.log("Update payload:", data);
        mutate({ ...data, quantity: Number(data.quantity) });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center gap-2 w-full py-2 rounded-md hover:bg-gray-200">
                <Edit className="size-5" />
                Update
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Blood Inventory</DialogTitle>
                    <DialogDescription>
                        Update the blood inventory details below.
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
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={1} {...field} onChange={e => field.onChange(Number(e.target.value))} />
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
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Updating..." : "Update"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateBloodInventoryDialog;