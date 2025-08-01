import { createBlog } from "@/apis/blog.api";
import { getCategories } from "@/apis/category.api";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { blogSchema, type BlogSchema } from "./blog.schema";

const CreateBlogDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      slug: "",
      title: "",
      category: "",
      summary: "",
      content: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setOpen(false);
      toast.success("Create blog successfully");
    },
  });
  const imageFile = form.watch("image");
  const onSubmit = async (blog: BlogSchema) => {
    const formData = new FormData();
    formData.append("slug", blog.slug);
    formData.append("title", blog.title);
    formData.append("category", blog.category);
    formData.append("summary", blog.summary);
    formData.append("content", blog.content);
    if (blog.image) formData.append("image", blog.image as File);
    mutate(formData);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Blog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Create a new blog. Fill in the details below.
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

export default CreateBlogDialog;
