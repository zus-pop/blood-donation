import { Schema } from "mongoose"

export const InventorySchema = new Schema(
  {
    bloodType: {
      type: Schema.Types.ObjectId,
      ref: "Blood",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participation: {
      type: Schema.Types.ObjectId,
      ref: "Participation",
      required: false,
    },
    componentType: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, collection: "inventory" }
);