import { Category } from "../models";
import { CategoryQuery } from "../types/category.type";

export async function findCategories(query: CategoryQuery) {
  const categories = Category.find(query);
  return categories;
}
