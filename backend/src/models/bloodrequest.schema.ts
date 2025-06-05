import { Schema } from "mongoose";

export const BloodRequestSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        bloodType: {
            type: String,
            required: true,
        },
        bloodComponent: {
            type: String,
            required: true,
            enum: ["WHOLE_BLOOD", "PLASMA", "PLATELETS", "RED_CELLS", "WHITE_CELLS"],
        },
        quantity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "PENDING",
            enum: ["PENDING", "APPROVAL", "REJECTED", "CANCELLED", "MATCHED", "FULL_FILLED", "IN_PROGRESS"],
        },
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: "bloodrequest" }
);