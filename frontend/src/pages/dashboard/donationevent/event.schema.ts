import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const baseEventSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  slot: z.coerce.number().min(1, "Slot must be a positive number"),
  location: z.string().optional(),
  status: z.enum(["UPCOMING", "ONGOING", "ENDED", "CANCELLED"]),
  registrationStartedAt: z.date({
    required_error: "Registration start date is required.",
  }).refine((date) => date > new Date(), {
    message: "Registration start date cannot be in the past",
  }),
  registrationEndedAt: z.date({
    required_error: "Registration end date is required.",
  }).refine((date) => date > new Date(), {
    message: "Registration end date cannot be in the past",
  }),
  eventStartedAt: z.date({
    required_error: "Event start date is required.",
  }).refine((date) => date > new Date(), {
    message: "Event start date cannot be in the past",
  }),
  eventEndedAt: z.date({
    required_error: "Event end date is required.",
  }).refine((date) => date > new Date(), {
    message: "Event end date cannot be in the past",
  }),
});

const imageValidation = z
  .any()
  .refine((file) => file, "Image is required.")
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

const refinedSchema = (schema: z.AnyZodObject) =>
  schema
    .refine((data) => data.registrationStartedAt < data.registrationEndedAt, {
      message: "Registration start must be before registration end",
      path: ["registrationStartedAt"],
    })
    .refine((data) => data.eventStartedAt < data.eventEndedAt, {
      message: "Event start must be before event end",
      path: ["eventStartedAt"],
    })
    .refine((data) => data.registrationEndedAt < data.eventStartedAt, {
      message: "Registration must end before the event starts",
      path: ["registrationEndedAt"],
    });

export const createEventSchema = refinedSchema(
  baseEventSchema.extend({
    image: imageValidation,
  })
);

export const updateEventSchema = refinedSchema(
  baseEventSchema.extend({
    image: imageValidation.or(z.string()).optional(),
  })
);

export type EventSchema = z.infer<typeof createEventSchema>;
export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
