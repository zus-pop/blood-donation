import { Blog } from "../models";
import { BlogQuery } from "../types/blog.type";

export async function findBlogs(query: BlogQuery) {
  const blogs = Blog.find(query);
  return blogs;
}
