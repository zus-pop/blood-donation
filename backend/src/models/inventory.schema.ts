import { Schema } from "mongoose"

export const InventorySchema = new Schema(
  {
    bloodType: {
      type: String,
      required: true,
    },
    participation: {
      type: Schema.Types.ObjectId,
      ref: "Participation",
      required: true,
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