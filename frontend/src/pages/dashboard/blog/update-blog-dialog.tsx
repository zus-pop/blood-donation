import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateBlog, type BlogProps } from "@/apis/blog.api";
import { getCategories } from "@/apis/category.api";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { blogSchema, type BlogSchema } from "./blog.schema";
import { toast } from "sonner";

const UpdateBlogDialog = ({ currentData }: { currentData: BlogProps }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      slug: currentData.slug,
      title: currentData.title,
      category: currentData.category?._id,
      summary: currentData.summary,
      content: currentData.content,
      image: currentData.image,
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setOpen(false);
      toast.success("Update blog successfully");
    },
  });
  const imageFile = form.watch("image");
  const onSubmit = async (blog: BlogSchema) => {
    const formData = new FormData();
    if (blog.slug) formData.append("slug", blog.slug);
    if (blog.title) formData.append("title", blog.title);
    if (blog.category) formData.append("category", blog.category);
    if (blog.summary) formData.append("summary", blog.summary);
    if (blog.content) formData.append("content", blog.content);

    if (blog.image instanceof File) {
      formData.append("image", blog.image);
    }
    mutate({
      data: formData,
      id: currentData._id,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-2 flex text-sm justify-start w-full gap-2 py-2 rounded-md cursor-none hover:bg-gray-200">
        <Edit className="size-5" />
        Update Blog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update A Blog</DialogTitle>
          <DialogDescription>
            Update a blog. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="h-[80vh] overflow-y-auto p-4 border rounded-md">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Article Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="article-slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief summary..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Full content here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        form.setValue("image", file, { shouldValidate: true });
                      }
                    }}
                  />
                </FormControl>
                {form.formState.errors.image && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.image.message}
                  </p>
                )}
                {imageFile && (
                  <img
                    src={
                      typeof imageFile === "string"
                        ? imageFile
                        : URL.createObjectURL(imageFile)
                    }
                    alt="Preview"
                    className="mt-2 h-auto w-full"
                  />
                )}
              </FormItem>

              <div className="flex justify-center">
                <Button disabled={isPending} className="text-xl" type="submit">
                  <span className="p-2">
                    {isPending ? <Loading /> : <span>Submit</span>}
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

export default UpdateBlogDialog;
