import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  registrationStartedAt: z.string().min(1, "Registration start is required"),
  registrationEndedAt: z.string().min(1, "Registration end is required"),
  eventStartedAt: z.string().min(1, "Event start is required"),
  eventEndedAt: z.string().min(1, "Event end is required"),
  status: z.enum(["UPCOMING", "REGISTRATION", "ONGOING", "ENDED", "CANCELLED"]),
});

export type EventSchema = z.infer<typeof eventSchema>;
