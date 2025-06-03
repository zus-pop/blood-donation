import { Schema } from "mongoose";

export const BloodRequestSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        bloodType: {
            type: String,
            required: true,
        },
        bloodComponent: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: "bloodrequest" }
);