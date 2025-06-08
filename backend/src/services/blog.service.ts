import { Blog } from "../models";
import { BlogQuery, CreateBlogDto, UpdateBlogDto } from "../types/blog.type";
import { findCategoryById } from "./category.service";

export async function findBlogs(query: BlogQuery) {
  const filter: BlogQuery = {};

  const { title, slug } = query;

  if (title) filter.title = { $regex: title, $options: "i" };

  if (slug) filter.slug = slug;

  const blogs = Blog.find(filter)
    .populate("category")
    .sort({ updatedAt: "desc" });
  return blogs;
}

export async function findBlogById(id: string) {
  const blog = await Blog.findById(id).populate("category");
  if (!blog) throw new Error("Blog not found");
  return blog;
}

export async function createBlog(blog: CreateBlogDto) {
  const category = await findCategoryById(blog.category);
  const newBlog = new Blog({
    slug: blog.slug,
    title: blog.title,
    category: category._id,
    summary: blog.summary,
    content: blog.content,
    image: blog.image,
  });
  return await newBlog.save();
}

export async function updateBlog(id: string, data: UpdateBlogDto) {
  const blog = await findBlogById(id);
  const { category, content, image, summary, title } = data;

  if (content) blog.content = content;
  if (image) blog.image = image;
  if (summary) blog.summary = summary;
  if (title) blog.title = title;

  if (category) {
    const newCategory = await findCategoryById(category);
    blog.category = newCategory._id;
  }
  return await blog.save();
}

export async function deleteBlog(id: string) {
  const deletedBlog = await Blog.findByIdAndDelete(id);

  if (!deletedBlog) throw new Error("Blog not found");

  return deletedBlog;
}
