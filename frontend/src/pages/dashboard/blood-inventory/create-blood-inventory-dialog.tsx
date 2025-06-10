import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventory } from "../../../apis/bloodInventory.api";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";

const CreateBloodInventoryDialog = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    bloodType: "",
    participation: "", // <-- use this
    componentType: "",
    quantity: 0,
    status: "",
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      setOpen(false);
      setForm({
        bloodType: "",
        participation: "",
        componentType: "",
        quantity: 0,
        status: "",
      });
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ ...form, quantity: Number(form.quantity) });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Inventory</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Blood Inventory</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="bloodType" placeholder="Blood Type ID" value={form.bloodType} onChange={handleChange} required />
          <Input name="participation" placeholder="Participation ID" value={form.participation} onChange={handleChange} required />
          <Input name="componentType" placeholder="Component Type" value={form.componentType} onChange={handleChange} required />
          <Input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
          <Input name="status" placeholder="Status" value={form.status} onChange={handleChange} required />
          <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBloodInventoryDialog;