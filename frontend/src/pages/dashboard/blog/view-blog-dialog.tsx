import { Calendar, Eye, Tag } from "lucide-react";
import type { BlogProps } from "@/apis/blog.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
interface ViewBlogDialogProps {
  blog: BlogProps;
}

const ViewBlogDialog = ({ blog }: ViewBlogDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 rounded-md cursor-none hover:bg-gray-200">
        <Eye className="size-5" />
        View blog
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{blog.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(new Date(blog.createdAt))}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              {blog.category.name}
            </div>
          </DialogDescription>
          <div className="mb-4">
            <img
              src={blog.image}
              alt="Blog Image"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </DialogHeader>
        <Separator />
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {blog.content || "No content available for this blog."}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBlogDialog;
