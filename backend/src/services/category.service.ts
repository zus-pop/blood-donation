import { Category } from "../models";
import {
  CategoryQuery,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../types/category.type";

export async function findCategories(query: CategoryQuery) {
  const filter: CategoryQuery = {};

  const { name, slug } = query;

  if (name) filter.name = { $regex: name, $options: "i" };
  if (slug) filter.slug = slug;

  const categories = await Category.find(filter).sort({ updatedAt: "desc" });
  return categories;
}

export async function findCategoryById(id: string) {
  const category = await Category.findById(id);
  if (!category) throw new Error("Resource not found");
  return category;
}

export async function createCategory(category: CreateCategoryDto) {
  const newCategory = new Category(category);
  return await newCategory.save();
}

export async function updateCategoryById(id: string, data: UpdateCategoryDto) {
  const category = await findCategoryById(id);
  const { name, slug, description } = data;

  if (name) category.name = name;
  if (slug) category.slug = slug;
  if (description) category.description = description;

  return await category.save();
}

export async function deleteCategoryById(id: string) {
  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) throw new Error("Category not found");

  return deletedCategory;
}
