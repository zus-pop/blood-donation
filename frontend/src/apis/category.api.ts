import myAxios from "../lib/custom-axios";
import type { CategorySchema } from "../pages/dashboard/category/category.schema";

export interface CategoryProps {
  _id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export async function getCategories() {
  const res = await myAxios.get(`/categories`);
  return res.data as CategoryProps[];
}

export async function createCategory(data: CategorySchema) {
  const res = await myAxios.post(`/categories`, data);
  return res.data as CategoryProps;
}

export async function updateCategory(id: string, data: CategorySchema) {
  const res = await myAxios.put(`/categories/${id}`, data);
  return res.data as CategoryProps;
}

export async function deleteCategory(id: string) {
  const res = await myAxios.delete(`/categories/${id}`);
  return res.data as CategoryProps;
}
