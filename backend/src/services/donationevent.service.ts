import { DonationEvent } from "../models";
import { CreateDonationEventDto, DonationEventQuery, UpdateDonationEventDto } from "../types/donationevent.type";

export const findDonationEvents = async (query: DonationEventQuery) => {
  return await DonationEvent.find(query);
};

export const createDonationEvent = async (data: CreateDonationEventDto) => {
  const event = new DonationEvent(data);
  return await event.save();
};

export const updateDonationEvent = async (id: string, data: UpdateDonationEventDto) => {
  const event = await DonationEvent.findById(id);
  if (!event) throw new Error("Donation event not found");
  const {
    title,
    description,
    registrationStartedAt,
    registrationEndedAt,
    eventStartedAt,
    eventEndedAt,
    status
  } = data;
  if (title) event.title = title;
  if (description) event.description = description;
  if (registrationStartedAt) event.registrationStartedAt = registrationStartedAt;
  if (registrationEndedAt) event.registrationEndedAt = registrationEndedAt;
  if (eventStartedAt) event.eventStartedAt = eventStartedAt;
  if (eventEndedAt) event.eventEndedAt = eventEndedAt;
  if (status) event.status = status;
  return await event.save();
};

export const deleteDonationEvent = async (id: string) => {
  const deletedEvent = await DonationEvent.findByIdAndDelete(id);

  if (!deletedEvent) throw new Error("Donation event not found");
  
  return deletedEvent;
};