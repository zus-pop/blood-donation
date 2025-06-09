// bloodrequest.schema.ts
import { z } from "zod";
import { userSchema } from "../user/user.schema";



export const bloodRequestSchema = z.object({
    user: userSchema,
    bloodType: z.string().min(1, "Blood type is required"),
    bloodComponent: z.string().min(1, "Blood component is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    status: z.string().min(1, "Status is required"),
    address: z.string().min(1, "Address is required"),
});

export type BloodRequestSchema = z.infer<typeof bloodRequestSchema>;
