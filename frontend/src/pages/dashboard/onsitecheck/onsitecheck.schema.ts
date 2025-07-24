import { z } from "zod";

export const onsiteCheckSchema = z.object({
  _id: z.string().optional(),
  participationId: z.string().min(1, "Participation ID is required"),
  pulseRate: z.coerce.number().min(1, "Pulse rate must be greater than 0").optional(),
  bloodPressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/, "Blood pressure must be in format XXX/YYY").optional(),
  hemoglobinLevel: z.coerce.number().min(1, "Hemoglobin level must be greater than 0").optional(),
  bodyTemperature: z.coerce.number().min(30, "Body temperature must be realistic").max(45, "Body temperature must be realistic").optional(),
  weight: z.coerce.number().min(1, "Weight must be greater than 0").optional(),
});

export type OnsiteCheckSchema = z.infer<typeof onsiteCheckSchema>;
