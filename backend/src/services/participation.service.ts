import { Participation } from "../models";
import { CreateParticipationDto, ParticipationQuery, UpdateParticipationDto } from "../types/participation.type";

export const findParticipations = async (query: ParticipationQuery) => {
  const filter: { userId?: string; eventId?: string; status?: string } = {};
  if (query.user) {
    filter.userId = query.user;
  }
  if (query.event) {
    filter.eventId = query.event;
  }
  if (query.status) {
    filter.status = query.status;
  }
  return await Participation.find(filter);
};

export const createParticipation = async (data: CreateParticipationDto) => {
  const { user, event, status } = data;
  const existingParticipation = await Participation.findOne({
    userId: user,
    eventId: event,
  });

  if (existingParticipation) {
    throw new Error("User has already registered for this event.");
  }

  const participation = new Participation({
    userId: user,
    eventId: event,
    status,
  });
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
