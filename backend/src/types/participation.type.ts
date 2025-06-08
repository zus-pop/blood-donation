export interface ParticipationQuery {
  user?: string;
  event?: string;
  status?: string;
}

export interface CreateParticipationDto {
  user: string;
  event: string;
  status: "REGISTERED" | "CANCELLED" | "ATTENDED";
}

export interface UpdateParticipationDto {
  status?: "REGISTERED" | "CANCELLED" | "ATTENDED";
} 