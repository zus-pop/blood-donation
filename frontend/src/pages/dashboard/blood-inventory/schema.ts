import { z } from "zod";

export const bloodInventorySchema = z.object({
  bloodType: z.string().min(1, "Blood type is required"),
  participation: z.string().min(1, "Participation is required"),
  componentType: z.string().min(1, "Component type is required"),
  quantity: z.number().min(0, "Quantity must be at least 0"),
  status: z.string().min(1, "Status is required"),
});

export type BloodInventorySchema = z.infer<typeof bloodInventorySchema>;