import axios from "../lib/custom-axios";

export interface EventProps {
  _id: string;
  title: string;
  description: string;
  registrationStartedAt: string;
  registrationEndedAt: string;
  eventStartedAt: string;
  eventEndedAt: string;
  status: "UPCOMING" | "REGISTRATION" | "ONGOING" | "ENDED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export interface EventInput {
  title: string;
  description: string;
  registrationStartedAt: string;
  registrationEndedAt: string;
  eventStartedAt: string;
  eventEndedAt: string;
  status: "UPCOMING" | "REGISTRATION" | "ONGOING" | "ENDED" | "CANCELLED";
}

export const getEvents = async (): Promise<EventProps[]> => {
  const res = await axios.get("/donationevents");
  return res.data;
};

export const createEvent = async (data: EventInput): Promise<EventProps> => {
  const res = await axios.post("/donationevents", data);
  return res.data;
};

export const updateEvent = async (
  id: string,
  data: Partial<EventInput>
): Promise<EventProps> => {
  const res = await axios.put(`/donationevents/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id: string): Promise<EventProps> => {
  const res = await axios.delete(`/donationevents/${id}`);
  return res.data;
};

export const getEventById = async (id: string): Promise<EventProps> => {
  const res = await axios.get(`/donationevents/${id}`);
  return res.data;
};
