import { Schema } from "mongoose";

export const BlogSchema = new Schema(
  {
    slug: {
      type: String,
      required: [true, "Blog slug is required"],
      unique: [true, "Blog slug must be unique"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, collection: "blog" }
);
