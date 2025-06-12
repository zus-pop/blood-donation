import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

const DeleteBloodInventoryDialog = ({
  callback,
}: {
  callback: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    callback();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex text-sm justify-start w-full gap-2 py-2 rounded-md cursor-pointer hover:bg-gray-200 text-red-600">
        <Trash className="size-5" />
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Blood Inventory</DialogTitle>
        </DialogHeader>
        <div>Are you sure you want to delete this record?</div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBloodInventoryDialog;