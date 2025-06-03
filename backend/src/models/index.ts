import { model } from "mongoose";
import { BlogSchema } from "./blog.schema";
import { CategorySchema } from "./category.schema";
import { UserSchema } from "./user.schema";
import { BloodRequestSchema } from "./bloodrequest.schema";

export const Category = model("Category", CategorySchema);
export const Blog = model("Blog", BlogSchema);
export const User = model("User", UserSchema);
export const BloodRequest = model("BloodRequest", BloodRequestSchema);