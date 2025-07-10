import { z } from "zod";

export const UserSchema = z.object({
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
export type UserSchema = z.infer<typeof UserSchema>;
