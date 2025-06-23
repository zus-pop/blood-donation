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
    slot: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: "Thu Duc City",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "donationevent" }
); 