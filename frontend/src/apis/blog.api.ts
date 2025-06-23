import myAxios from "../lib/custom-axios";
import type { CategoryProps } from "./category.api";

export interface BlogProps {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  category: CategoryProps;
  createdAt: string;
  updatedAt: string;
}

export interface BlogQuery {
  title?: string;
  slug?: string;
  category?: string;
}

export async function getBlogs(query?: BlogQuery) {
  const params: Record<string, string> = {};

  if (query && query.title) params.title = query.title;
  if (query && query.slug) params.slug = query.slug;
  if (query && query.category) params.category = query.category;

  const res = await myAxios.get(`/blogs`, {
    params,
  });
  return res.data as BlogProps[];
}

export async function getBlog(id: string) {
  const res = await myAxios.get(`/blogs/${id}`);
  return res.data as BlogProps;
}

export async function createBlog(blog: FormData) {
  const res = await myAxios.post(`/blogs`, blog, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data as BlogProps;
}

export async function updateBlog(id: string, blog: FormData) {
  const res = await myAxios.put(`/blogs/${id}`, blog, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data as BlogProps;
}

export async function deleteBlog(id: string) {
  const res = await myAxios.delete(`/blogs/${id}`);
  return res.data as BlogProps;
}
