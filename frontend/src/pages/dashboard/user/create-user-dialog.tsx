import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "./user.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/apis/user.api";
import { useState } from "react";

export default function CreateUserDialog() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const form = useForm({
        resolver: zodResolver(userSchema.pick({
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
            password: true,
        })),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            role: "MEMBER",
            password: "",
        },
    });
    const { mutate, isPending } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setOpen(false);
            form.reset();
        },
    });
    function onSubmit(values: any) {
        mutate(values);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create User</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Input placeholder="Email" {...form.register("email")} />
                    <Input placeholder="First Name" {...form.register("firstName")} />
                    <Input placeholder="Last Name" {...form.register("lastName")} />
                    <Input placeholder="Phone" {...form.register("phone")} />
                    <Input placeholder="Role" {...form.register("role")} />
                    <Input placeholder="Password" type="password" {...form.register("password")} />
                    <Button type="submit" disabled={isPending} className="w-full">Create</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
} 