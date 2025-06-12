import { Schema } from "mongoose";

export const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: [true, "Slug must be unique"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true, collection: "category" }
);
