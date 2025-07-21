// create-bloodrequest-dialog.tsx
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
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createBloodRequest } from "@/apis/bloodrequest.api";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
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
import { getActiveUsers } from "@/apis/user.api";
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
  "PENDING"
];

const CreateBloodRequestDialog = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { data: users = [] } = useUserQuery({
    queryKey: ["users-actives"],
    queryFn: getActiveUsers,
    staleTime: 1000 * 60,
  });

  const form = useForm<BloodRequestSchema>({
    resolver: zodResolver(bloodRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      bloodType: "",
      bloodComponent: "WHOLE_BLOOD",
      quantity: 100,
      status: "PENDING",
      address: "",
      requestedBy: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBloodRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bloodrequests"] });
      setOpen(false);
      form.reset();
      toast.success("Blood request created successfully!");
    },
  });

  // Reset form về giá trị mặc định mỗi khi đóng/mở modal
  useEffect(() => {
    if (!open) {
      form.reset({
        name: "",
        phone: "",
        bloodType: "",
        bloodComponent: "WHOLE_BLOOD",
        quantity: 100,
        status: "PENDING",
        address: "",
        requestedBy: "",
      });
    }
  }, [open]);

  function onSubmit(data: BloodRequestSchema) {
    mutate(data);
  }

  useEffect(() => {
    if (open && formRef.current) {
      // blur any focused element when modal opens
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 100);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Blood Request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Blood Request</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new blood request.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="h-[70vh] overflow-y-auto p-4 border rounded-md">
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="requestedBy"
                render={({ field }) => {
                  const [search, setSearch] = useState("");
                  const [isFocused, setIsFocused] = useState(false);
                  const filteredUsers = users.filter(
                    (user) =>
                      user.email.toLowerCase().includes(search.toLowerCase())
                  );
                  return (
                    <FormItem>
                      <FormLabel>Email of User</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Search email..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                            className="mb-2"
                            tabIndex={-1}
                          />
                          {isFocused && (
                            <div className="max-h-40 overflow-y-auto border rounded absolute bg-white w-full z-10">
                              {filteredUsers.map(user => (
                                <div
                                  key={user._id}
                                  className={`p-2 cursor-pointer hover:bg-gray-100 ${field.value === user._id ? "bg-gray-200" : ""}`}
                                  onMouseDown={() => {
                                    field.onChange(user._id);
                                    form.setValue('name', `${user.firstName} ${user.lastName}`);
                                    setSearch(`${user.email}`);
                                  }}
                                >
                                  {user.email}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter name"
                        {...field}
                        tabIndex={-1}
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
                        tabIndex={-1}
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
                    <FormLabel>Quantity (bags)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
                              <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                                {status}
                              </span>
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
                    {isPending ? <Loading inline message="Creating..." /> : <span>Submit</span>}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBloodRequestDialog;
