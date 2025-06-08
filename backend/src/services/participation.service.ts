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
  return await Participation.findByIdAndUpdate(id, data, { new: true });
};

export const deleteParticipation = async (id: string) => {
  return await Participation.findByIdAndDelete(id);
}; 