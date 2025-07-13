import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getCategories } from "@/apis/category.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./category-column";
import CreateCategoryDialog from "./create-category-dialog";
import { toast } from "sonner";
import { useProfileStore } from "@/store/profileStore";

const CategoryTable = () => {
  const { profile } = useProfileStore();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Delete category successfully");
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Category Management
          </h1>
          <p className="text-muted-foreground">
            Manage your categories and content
          </p>
        </div>
        {profile?.role === "STAFF" ? (
          <CreateCategoryDialog />
        ) : (
          <p className="text-muted-foreground">
            Only staffs can create categories
          </p>
        )}
      </div>
      <DataTable
        filter="name"
        columns={columns({
          onDelete: mutate,
        })}
        data={categories ?? []}
      />
    </div>
  );
};

export default CategoryTable;
