import { Schema } from "mongoose";

export const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["ADMIN", "STAFF", "MEMBER", "HOSPITAL"],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }

    },
    { timestamps: true, collection: "user" }
);

