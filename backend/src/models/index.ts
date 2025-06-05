import { model } from "mongoose";
import { BlogSchema } from "./blog.schema";
import { CategorySchema } from "./category.schema";
import { UserSchema } from "./user.schema";
import { BloodRequestSchema } from "./bloodrequest.schema";
import { BloodSchema } from "./blood.schema";
import { InventorySchema } from "./inventory.schema";

export const Category = model("Category", CategorySchema);
export const Blog = model("Blog", BlogSchema);
export const User = model("User", UserSchema);
export const BloodRequest = model("BloodRequest", BloodRequestSchema);
export const Blood = model("Blood", BloodSchema);
export const Inventory = model ("Inventory", InventorySchema);
