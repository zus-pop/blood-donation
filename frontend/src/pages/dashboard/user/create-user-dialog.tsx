import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerUser } from "../../../apis/auth.api";
import { UserSchema } from "./user.schema";

export default function CreateUserDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(
      UserSchema.pick({
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        password: true,
      })
    ),
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
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      form.reset();
      toast.success("User created successfully");
    },
  });
  function onSubmit(values: any) {
    mutate(values);
  }
  const ROLE_OPTIONS = ["ADMIN", "MEMBER", "STAFF"];
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
          <Input placeholder="First Name" {...form.register("firstName")} />
          <Input placeholder="Last Name" {...form.register("lastName")} />
          <Input placeholder="Phone" {...form.register("phone")} />
          <Input placeholder="Email" {...form.register("email")} />
          <Input
            placeholder="Password"
            type="password"
            {...form.register("password")}
          />
          <div>
            <label className="block mb-1">Role</label>
            <Select
              value={form.watch("role")}
              onValueChange={(val) => form.setValue("role", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? <Loading inline message="Creating..." /> : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
