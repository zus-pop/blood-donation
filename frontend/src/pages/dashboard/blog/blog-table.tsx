import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteBlog, getBlogs } from "@/apis/blog.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./blog-column";
import CreateBlogDialog from "./create-blog-dialog";
import { useProfileStore } from "@/store/profileStore";

const BlogTable = () => {
  const { profile } = useProfileStore();
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Delete blog successfully");
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">Manage your blogs and content</p>
        </div>
        {profile?.role === "STAFF" ? (
          <CreateBlogDialog />
        ) : (
          <p className="text-muted-foreground">Only staffs can create blogs</p>
        )}
      </div>
      <DataTable
        filter="title"
        columns={columns({
          onDelete: mutate,
        })}
        data={blogs ?? []}
      />
    </div>
  );
};

export default BlogTable;
