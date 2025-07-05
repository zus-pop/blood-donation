import { z } from "zod";

export const onsiteCheckSchema = z.object({
  _id: z.any().optional(),
  participationId: z.any().optional(),
  pulseRate: z.any().optional(),
  bloodPressure: z.any().optional(),
  hemoglobinLevel: z.any().optional(),
  bodyTemperature: z.any().optional(),
  weight: z.any().optional(),
  canDonate: z.any().optional(),
  checkedAt: z.any().optional(),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
});

export type OnsiteCheckSchema = z.infer<typeof onsiteCheckSchema>; 