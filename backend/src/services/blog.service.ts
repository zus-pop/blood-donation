import { Blog } from "../models";
import { BlogQuery, CreateBlogDto } from "../types/blog.type";
import { findCategoryById } from "./category.service";

export async function findBlogs(query: BlogQuery) {
  const filter: BlogQuery = {};

  const { title, slug } = query;

  if (title) filter.title = { $regex: title, $options: "i" };

  if (slug) filter.slug = slug;

  const blogs = Blog.find(filter);
  return blogs;
}

export async function findById(id: string) {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Resource not found");
  return blog;
}

export async function createBlog(blog: CreateBlogDto) {
  try {
    const category = await findCategoryById(blog.category);
    const newBlog = new Blog({
      slug: blog.slug,
      title: blog.title,
      category: category,
      summary: blog.summary,
      content: blog.content,
      image: blog.image,
    });
    return await newBlog.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

