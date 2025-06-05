import { Schema } from "mongoose";

export const BloodSchema = new Schema(
    {
        bloodType: {
            type: String,
            required: true,
        },
        compatibility: {
            wholeBlood: {
                receiveFrom: [{ type: Schema.Types.ObjectId, ref: "Blood" }],
                donateTo: [{ type: Schema.Types.ObjectId, ref: "Blood" }]
            },
            rbc: {
                receiveFrom: [{ type: Schema.Types.ObjectId, ref: "Blood" }],
                donateTo: [{ type: Schema.Types.ObjectId, ref: "Blood" }]
            },
            plasma: {
                receiveFrom: [{ type: Schema.Types.ObjectId, ref: "Blood" }],
                donateTo: [{ type: Schema.Types.ObjectId, ref: "Blood" }]
            },
            platelets: {
                receiveFrom: [{ type: Schema.Types.ObjectId, ref: "Blood" }],
                donateTo: [{ type: Schema.Types.ObjectId, ref: "Blood" }]
            }
        }
    },
    { timestamps: true, collection: "blood" }
);