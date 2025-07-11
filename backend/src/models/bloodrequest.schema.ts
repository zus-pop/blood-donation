import { Schema } from "mongoose";

export const BloodRequestSchema = new Schema(
    {
        name: {
            type: String,
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
            enum: ["PENDING", "APPROVAL", "REJECTED", "CANCELLED", "FULL_FILLED", "IN_PROGRESS"],
        },
        phone:
        {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        requestedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    { timestamps: true, collection: "bloodrequest" }
);