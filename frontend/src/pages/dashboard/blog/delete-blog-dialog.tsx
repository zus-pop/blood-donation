import { Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

interface DeleteBlogProps {
  callback: () => void;
}

const DeleteBlogDialog = ({ callback }: DeleteBlogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="ml-2 flex text-sm text-red-600  justify-start w-full gap-2 py-2 rounded-md cursor-none hover:bg-gray-200">
        <span>
          <Trash className="size-5" />
        </span>
        Delete blog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this blog
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={callback}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBlogDialog;
