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
            enum: ["Whole Blood", "Plasma", "Platelets", "Red Cells", "White Cells"],
        },
        quantity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
            enum: ["Pending", "Approved", "Rejected", "Cancelled", "Matched", "Fullfilled", "In Progress"],
        },
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: "bloodrequest" }
);