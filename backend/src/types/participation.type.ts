export interface ParticipationQuery {
  user?: string;
  event?: string;
  status?: string;
}

export interface CreateParticipationDto {
  user: string;
  event: string;
  status: "REGISTERED" | "CANCELLED" | "ATTENDED" | "NOT_ELIGIBLE";
}

export interface UpdateParticipationDto {
  status?: "REGISTERED" | "CANCELLED" | "ATTENDED" | "NOT_ELIGIBLE";
} 