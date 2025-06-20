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

export async function getBlogs() {
  const res = await myAxios.get(`/blogs`);
  return res.data as BlogProps[];
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
