import { DonationEvent } from "../models";
import { CreateDonationEventDto, DonationEventQuery, UpdateDonationEventDto } from "../types/donationevent.type";

export const findDonationEvents = async (query: DonationEventQuery) => {
  return await DonationEvent.find(query).sort({ createdAt: -1 });
};

export const createDonationEvent = async (data: CreateDonationEventDto) => {
  const now = new Date();
  
  // Validate that all dates are not in the past
  if (new Date(data.registrationStartedAt) < now) {
    throw new Error("Registration start date cannot be in the past");
  }
  if (new Date(data.registrationEndedAt) < now) {
    throw new Error("Registration end date cannot be in the past");
  }
  if (new Date(data.eventStartedAt) < now) {
    throw new Error("Event start date cannot be in the past");
  }
  if (new Date(data.eventEndedAt) < now) {
    throw new Error("Event end date cannot be in the past");
  }
  
  const event = new DonationEvent(data);
  return await event.save();
};

export const updateDonationEvent = async (id: string, data: UpdateDonationEventDto) => {
  const event = await DonationEvent.findById(id);
  if (!event) throw new Error("Donation event not found");
  
  // Block all updates for ENDED or CANCELLED events
  if (event.status === "ENDED" || event.status === "CANCELLED") {
    throw new Error(`Cannot update ${event.status.toLowerCase()} events. This event can no longer be modified.`);
  }
  
  const now = new Date();
  const {
    title,
    description,
    registrationStartedAt,
    registrationEndedAt,
    eventStartedAt,
    eventEndedAt,
    status
  } = data;
  
  // Validate status transitions
  if (status && status !== event.status) {
    const currentStatus = event.status;
    
    // Define allowed transitions
    const allowedTransitions: Record<string, string[]> = {
      "UPCOMING": ["ONGOING", "CANCELLED"],
      "ONGOING": ["ENDED"],
      "ENDED": [], // No transitions allowed
      "CANCELLED": [] // No transitions allowed
    };
    
    const validNextStatuses = allowedTransitions[currentStatus] || [];
    
    if (!validNextStatuses.includes(status)) {
      throw new Error(`Cannot change status from ${currentStatus} to ${status}. Valid transitions from ${currentStatus}: ${validNextStatuses.length > 0 ? validNextStatuses.join(', ') : 'none'}`);
    }
  }
  
  // Validate that updated dates are not in the past
  if (registrationStartedAt && new Date(registrationStartedAt) < now) {
    throw new Error("Registration start date cannot be in the past");
  }
  if (registrationEndedAt && new Date(registrationEndedAt) < now) {
    throw new Error("Registration end date cannot be in the past");
  }
  if (eventStartedAt && new Date(eventStartedAt) < now) {
    throw new Error("Event start date cannot be in the past");
  }
  if (eventEndedAt && new Date(eventEndedAt) < now) {
    throw new Error("Event end date cannot be in the past");
  }
  
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