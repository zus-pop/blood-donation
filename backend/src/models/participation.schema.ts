import { model, Schema } from "mongoose";

export const ParticipationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "DonationEvent",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true, collection: "participation" }
); 