import { z } from "zod";

export const bloodInventorySchema = z.object({
  bloodType: z.string().min(1, "Blood type is required"),
  userId: z.string().min(1, "User is required"),
  componentType: z.string().min(1, "Component type is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  status: z.string().min(1, "Status is required"),
});

export type BloodInventoryForm = z.infer<typeof bloodInventorySchema>;