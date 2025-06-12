import { z } from "zod";

export const userSchema = z.object({
    _id: z.string().min(1, "User ID is required"),
    email: z.string().email("Invalid email"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    role: z.string().optional(),
    password: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});
export type userSchema = z.infer<typeof userSchema>;