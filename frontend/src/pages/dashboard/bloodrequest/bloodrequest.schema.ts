// bloodrequest.schema.ts
import { z } from "zod";
// import { userSchema } from "../user/user.schema";



export const bloodRequestSchema = z.object({
    requestedBy: z.string().min(1, "User Request ID is required"),
    name: z.string().min(1, "Name is required"),
    bloodType: z.string().min(1, "Blood type is required"),
    bloodComponent: z.string().min(1, "Blood component is required"),
    quantity: z.number().min(100, "Quantity must be at least 100ml"),
    status: z.string(),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
});

export type BloodRequestSchema = z.infer<typeof bloodRequestSchema>;
