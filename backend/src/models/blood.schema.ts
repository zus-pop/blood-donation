import { Schema } from "mongoose";

const BloodCompatibilitySchema = new Schema(
    {
        receiveFrom: [{ type: Schema.Types.ObjectId, ref: "Blood" }],
        donateTo: [{ type: Schema.Types.ObjectId, ref: "Blood" }]
    },
)

export const BloodSchema = new Schema(
    {
        bloodType: {
            type: String,
            required: true,
        },
        compatibility: {
            wholeBlood: BloodCompatibilitySchema,
            rbc: BloodCompatibilitySchema,
            plasma: BloodCompatibilitySchema,
            platelets: BloodCompatibilitySchema,
        }
    },
    { timestamps: true, collection: "blood" }
);