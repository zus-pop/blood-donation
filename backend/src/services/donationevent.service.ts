import { DonationEvent } from "../models";
import { DonationEventQuery } from "../types/donationevent.type";

export const findDonationEvents = async (query: DonationEventQuery) => {
  return await DonationEvent.find(query);
};

export const createDonationEvent = async (data: any) => {
  const event = new DonationEvent(data);
  return await event.save();
};

export const updateDonationEvent = async (id: string, data: any) => {
  return await DonationEvent.findByIdAndUpdate(id, data, { new: true });
};

export const deleteDonationEvent = async (id: string) => {
  return await DonationEvent.findByIdAndDelete(id);
};