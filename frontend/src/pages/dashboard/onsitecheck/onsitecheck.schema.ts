import { z } from "zod";

export const onsiteCheckSchema = z.object({
  _id: z.string().optional(),
  participationId: z.string().min(1, "Participation ID is required"),
  pulseRate: z.number().min(0).optional(),
  bloodPressure: z.string().optional(),
  hemoglobinLevel: z.number().min(0).optional(),
  bodyTemperature: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
  canDonate: z.boolean().optional(),
});

export type OnsiteCheckSchema = z.infer<typeof onsiteCheckSchema>;
