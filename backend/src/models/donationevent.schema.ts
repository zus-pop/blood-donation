import { model, Schema } from "mongoose";

export const DonationEventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    registrationStartedAt: {
      type: Date,
      required: true,
    },
    registrationEndedAt: {
      type: Date,
      required: true,
    },
    eventStartedAt: {
      type: Date,
      required: true,
    },
    eventEndedAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["UPCOMING", "REGISTRATION", "ONGOING", "ENDED", "CANCELLED"],
      default: "UPCOMING",
    },
  },
  { timestamps: true, collection: "donationevent" }
); 