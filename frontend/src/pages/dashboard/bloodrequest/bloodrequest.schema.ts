// bloodrequest.schema.ts
import { z } from "zod";

export const userSchema = z.object({
    _id: z.string().min(1, "User ID is required"),
    email: z.string().email("Invalid email"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    role: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const bloodRequestSchema = z.object({
    user: userSchema,
    bloodType: z.string().min(1, "Blood type is required"),
    bloodComponent: z.string().min(1, "Blood component is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    status: z.string().min(1, "Status is required"),
    address: z.string().min(1, "Address is required"),
});

export type BloodRequestSchema = z.infer<typeof bloodRequestSchema>;
