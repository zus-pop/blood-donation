import { model } from "mongoose";
import { BlogSchema } from "./blog.schema";
import { CategorySchema } from "./category.schema";

export const Category = model("Category", CategorySchema);
export const Blog = model("Blog", BlogSchema);
