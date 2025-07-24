import { z } from "zod";

export const userSchema = z.object({
  _id: z.string().min(1, "User ID is required"),
  email: z.string().trim().email("Invalid email"),
  firstName: z.string().trim().min(2, "First Name is required"),
  lastName: z.string().trim().min(2, "Last Name is required"),
  phone: z.string().trim().min(10, "Phone number is required"),
  role: z.string().optional(),
  password: z.string().trim().min(1, "Password must be at least 6 characters long"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type UserSchema = z.infer<typeof userSchema>;
