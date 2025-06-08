export interface DonationEventQuery {
  title?: string;
  date?: Date;
  location?: string;
  organizer?: string;
}

export interface CreateDonationEventDto {
  title: string;
  description: string;
  registrationStartedAt: Date;
  registrationEndedAt: Date;
  eventStartedAt: Date;
  eventEndedAt: Date;
  status: "UPCOMING" | "REGISTRATION" | "ONGOING" | "ENDED" | "CANCELLED";
}

export interface UpdateDonationEventDto {
  title?: string;
  description?: string;
  registrationStartedAt?: Date;
  registrationEndedAt?: Date;
  eventStartedAt?: Date;
  eventEndedAt?: Date;
  status?: "UPCOMING" | "REGISTRATION" | "ONGOING" | "ENDED" | "CANCELLED";
} 