import { Participation } from "../models";
import { ParticipationQuery } from "../types/participation.type";

export async function findParticipations(query: ParticipationQuery) {
  const participations = Participation.find(query);
  return participations;
} 