import { z } from "zod";

const STATUS_VALUES = ["available", "reserved", "in_testing", "used", "expired", "quarantined"] as const;

export const bloodInventorySchema = z.object({
  bloodType: z.string().min(1, "Blood type is required"),
  participation: z.string().min(1, "Participation ID is required"),
  componentType: z.string().min(1, "Component type is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  status: z.enum(STATUS_VALUES, {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
});

export type BloodInventoryForm = z.infer<typeof bloodInventorySchema>;