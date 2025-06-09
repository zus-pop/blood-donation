import { Participation } from "../models";
import { CreateParticipationDto, ParticipationQuery, UpdateParticipationDto } from "../types/participation.type";

export const findParticipations = async (query: ParticipationQuery) => {
  return await Participation.find(query);
};

export const createParticipation = async (data: CreateParticipationDto) => {
  const participation = new Participation(data);
  return await participation.save();
};

export const updateParticipation = async (id: string, data: UpdateParticipationDto) => {
  const participation = await Participation.findById(id);
  if (!participation) throw new Error("Participation not found");
  const { status } = data;
  if (status) participation.status = status;
  return await participation.save();
};

export const deleteParticipation = async (id: string) => {
  const deletedParticipation = await Participation.findByIdAndDelete(id);

  if (!deletedParticipation) throw new Error("Participation not found");
  
  return deletedParticipation;
};
