export interface DonationEventQuery {
  title: string;
  description: string;
  registrationStartedAt: Date;
  registrationEndedAt: Date;
  eventStartedAt: Date;
  eventEndedAt: Date;
  status: "UPCOMING" | "REGISTRATION" | "ONGOING" | "ENDED" | "CANCELLED";
} 