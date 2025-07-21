import { Participation, DonationEvent } from "../models";
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

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export const updateParticipation = async (id: string, data: UpdateParticipationDto) => {
  const participation = await Participation.findById(id);
  if (!participation) throw new Error("Participation not found");
  const { status } = data;
  if (status) participation.status = status;
  const saved = await participation.save();

  // Nếu chuyển sang ATTENDED thì hủy các participation REGISTERED khác dưới 3 tháng
  if (status === "ATTENDED") {
    // Lấy event vừa attended
    const attendedEvent = await DonationEvent.findById(participation.eventId);
    if (attendedEvent) {
      const attendedEnd = new Date(attendedEvent.eventEndedAt);
      const threeMonthsAfter = addMonths(attendedEnd, 3);
      // Tìm các participation REGISTERED khác của user
      const toCancel = await Participation.find({
        userId: participation.userId,
        status: "REGISTERED",
        _id: { $ne: participation._id },
      });
      for (const part of toCancel) {
        const ev = await DonationEvent.findById(part.eventId);
        if (ev && new Date(ev.eventStartedAt) < threeMonthsAfter) {
          part.status = "CANCELLED";
          await part.save();
        }
      }
    }
  }
  return saved;
};

export const deleteParticipation = async (id: string) => {
  const deletedParticipation = await Participation.findByIdAndDelete(id);

  if (!deletedParticipation) throw new Error("Participation not found");

  return deletedParticipation;
};
