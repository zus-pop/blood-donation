import { DonationEvent } from "../models";
import { DonationEventQuery } from "../types/donationevent.type";

export async function findDonationEvents(query: DonationEventQuery) {
  const events = DonationEvent.find(query);
  return events;
  
} 
export async function createDonationEvent(data:any) {
  const donationEvent = new DonationEvent(data);
  return await donationEvent.save();
  
}