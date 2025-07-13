import { z } from "zod";

export const participationSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().min(1, "User is required"),
  eventId: z.string().min(1, "Event is required"),
  status: z.enum(["REGISTERED", "CANCELLED", "ATTENDED", "NOT_ELIGIBLE"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ParticipationSchema = z.infer<typeof participationSchema>; 