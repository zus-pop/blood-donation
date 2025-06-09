import { Participation } from "../models";
import { ParticipationQuery } from "../types/participation.type";

export const findParticipations = async (query: ParticipationQuery) => {
  return await Participation.find(query);
};

export const createParticipation = async (data: any) => {
  const participation = new Participation(data);
  return await participation.save();
};

export const updateParticipation = async (id: string, data: any) => {
  const participation = await Participation.findById(id);
  if (!participation) throw new Error("Participation not found");
  const { userId, eventId, status } = data;
  if (userId) participation.userId = userId;
  if (eventId) participation.eventId = eventId;
  if (status) participation.status = status;
  return await participation.save();
};

export const deleteParticipation = async (id: string) => {
  const deletedParticipation = await Participation.findByIdAndDelete(id);

  if (!deletedParticipation) throw new Error("Participation not found");
  
  return deletedParticipation;
};
