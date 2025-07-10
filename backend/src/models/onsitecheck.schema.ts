import { Schema } from "mongoose";

export const OnSiteCheckSchema = new Schema(
  {
    participationId: {
      type: Schema.Types.ObjectId,
      ref: "Participation",
      required: true,
    },
    pulseRate: Number,
    bloodPressure: String,
    hemoglobinLevel: Number,
    bodyTemperature: Number,
    weight: Number,
    canDonate: Boolean,
  },
  { timestamps: true, collection: "onsitecheck" }
); 