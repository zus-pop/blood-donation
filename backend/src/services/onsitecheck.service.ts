import { OnSiteCheck } from "../models";
import { CreateOnSiteCheckDto, OnSiteCheckQuery, UpdateOnSiteCheckDto } from "../types/onsitecheck.type";
import { Participation, DonationEvent } from "../models";
import mongoose from "mongoose";

export async function findOnSiteChecks(query: OnSiteCheckQuery) {
  const checks = await OnSiteCheck.find(query)
    .populate({
      path: 'participationId',
      populate: { path: 'userId' }
    });
  return checks;
}

function checkCanDonate({ hemoglobinLevel, bloodPressure, pulseRate, bodyTemperature, weight }: {
  hemoglobinLevel?: number;
  bloodPressure?: string;
  pulseRate?: number;
  bodyTemperature?: number;
  weight?: number;
}): boolean {
  if (
    hemoglobinLevel === undefined || hemoglobinLevel < 120
  ) return false;

  if (
    bloodPressure === undefined ||
    !/^\d{2,3}\/\d{2,3}$/.test(bloodPressure)
  ) return false;
  const [sys, dia] = bloodPressure.split("/").map(Number);
  if (sys < 100 || sys > 140 || dia < 60 || dia > 90) return false;

  if (
    pulseRate === undefined || pulseRate < 60 || pulseRate > 100
  ) return false;

  if (
    bodyTemperature === undefined || bodyTemperature < 36 || bodyTemperature > 37.5
  ) return false;

  if (
    weight === undefined || weight < 42
  ) return false;

  return true;
}

export const createOnsiteCheck = async (data: CreateOnSiteCheckDto) => {
  const canDonate = checkCanDonate(data);
  const onsiteCheck = new OnSiteCheck({ ...data, canDonate });
  // Nếu không đủ điều kiện, cập nhật participation status
  if (!canDonate && data.participationId) {
    // Update current participation to NOT_ELIGIBLE
    const failedParticipation = await Participation.findByIdAndUpdate(data.participationId, { status: "NOT_ELIGIBLE" }, { new: true });
    if (failedParticipation) {
      // Populate userId and eventId
      await failedParticipation.populate('userId');
      await failedParticipation.populate('eventId');
      const userId = failedParticipation.userId;
      const eventId = failedParticipation.eventId;
      // Get failed event's eventEndedAt
      const failedEvent = await DonationEvent.findById(eventId);
      if (failedEvent) {
        const failedEventEnd = new Date(failedEvent.eventEndedAt);
        const threeMonthsAfter = new Date(failedEventEnd);
        threeMonthsAfter.setMonth(threeMonthsAfter.getMonth() + 3);
        // Find all REGISTERED participations for this user (except the failed one)
        const toCancel = await Participation.find({
          userId: userId,
          status: "REGISTERED",
          _id: { $ne: failedParticipation._id },
        });
        for (const part of toCancel) {
          const ev = await DonationEvent.findById(part.eventId);
          if (ev && new Date(ev.eventStartedAt) < threeMonthsAfter && new Date(ev.eventStartedAt) > failedEventEnd) {
            part.status = "CANCELLED";
            await part.save();
          }
        }
      }
    }
  }
  return await onsiteCheck.save();
};

export const updateOnsiteCheck = async (id: string, data: UpdateOnSiteCheckDto) => {
  const onsiteCheck = await OnSiteCheck.findById(id);
  if (!onsiteCheck) throw new Error("Onsite check not found");
  const {
    pulseRate,
    bloodPressure,
    hemoglobinLevel,
    bodyTemperature,
    weight
  } = data;
  if (pulseRate !== undefined) onsiteCheck.pulseRate = pulseRate;
  if (bloodPressure !== undefined) onsiteCheck.bloodPressure = bloodPressure;
  if (hemoglobinLevel !== undefined) onsiteCheck.hemoglobinLevel = hemoglobinLevel;
  if (bodyTemperature !== undefined) onsiteCheck.bodyTemperature = bodyTemperature;
  if (weight !== undefined) onsiteCheck.weight = weight;
  onsiteCheck.canDonate = checkCanDonate({
    hemoglobinLevel: onsiteCheck.hemoglobinLevel ?? undefined,
    bloodPressure: onsiteCheck.bloodPressure ?? undefined,
    pulseRate: onsiteCheck.pulseRate ?? undefined,
    bodyTemperature: onsiteCheck.bodyTemperature ?? undefined,
    weight: onsiteCheck.weight ?? undefined,
  });
  // Nếu không đủ điều kiện, cập nhật participation status
  if (!onsiteCheck.canDonate && onsiteCheck.participationId) {
    const failedParticipation = await Participation.findByIdAndUpdate(onsiteCheck.participationId, { status: "NOT_ELIGIBLE" }, { new: true });
    if (failedParticipation) {
      await failedParticipation.populate('userId');
      await failedParticipation.populate('eventId');
      const userId = failedParticipation.userId;
      const eventId = failedParticipation.eventId;
      const failedEvent = await DonationEvent.findById(eventId);
      if (failedEvent) {
        const failedEventEnd = new Date(failedEvent.eventEndedAt);
        const threeMonthsAfter = new Date(failedEventEnd);
        threeMonthsAfter.setMonth(threeMonthsAfter.getMonth() + 3);
        const toCancel = await Participation.find({
          userId: userId,
          status: "REGISTERED",
          _id: { $ne: failedParticipation._id },
        });
        for (const part of toCancel) {
          const ev = await DonationEvent.findById(part.eventId);
          if (ev && new Date(ev.eventStartedAt) < threeMonthsAfter && new Date(ev.eventStartedAt) > failedEventEnd) {
            part.status = "CANCELLED";
            await part.save();
          }
        }
      }
    }
  }
  return await onsiteCheck.save();
};

export const deleteOnsiteCheck = async (id: string) => {
  const deletedOnsiteCheck = await OnSiteCheck.findByIdAndDelete(id);

  if (!deletedOnsiteCheck) throw new Error("Onsite check not found");

  return deletedOnsiteCheck;
}; 