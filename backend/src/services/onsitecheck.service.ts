import { OnSiteCheck } from "../models";
import { CreateOnSiteCheckDto, OnSiteCheckQuery, UpdateOnSiteCheckDto } from "../types/onsitecheck.type";

export async function findOnSiteChecks(query: OnSiteCheckQuery) {
  const checks = OnSiteCheck.find(query);
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
    weight,
    checkedAt
  } = data;
  if (pulseRate !== undefined) onsiteCheck.pulseRate = pulseRate;
  if (bloodPressure !== undefined) onsiteCheck.bloodPressure = bloodPressure;
  if (hemoglobinLevel !== undefined) onsiteCheck.hemoglobinLevel = hemoglobinLevel;
  if (bodyTemperature !== undefined) onsiteCheck.bodyTemperature = bodyTemperature;
  if (weight !== undefined) onsiteCheck.weight = weight;
  if (checkedAt !== undefined) onsiteCheck.checkedAt = checkedAt;
  onsiteCheck.canDonate = checkCanDonate({
    hemoglobinLevel: onsiteCheck.hemoglobinLevel ?? undefined,
    bloodPressure: onsiteCheck.bloodPressure ?? undefined,
    pulseRate: onsiteCheck.pulseRate ?? undefined,
    bodyTemperature: onsiteCheck.bodyTemperature ?? undefined,
    weight: onsiteCheck.weight ?? undefined,
  });
  return await onsiteCheck.save();
};

export const deleteOnsiteCheck = async (id: string) => {
  const deletedOnsiteCheck = await OnSiteCheck.findByIdAndDelete(id);

  if (!deletedOnsiteCheck) throw new Error("Onsite check not found");
  
  return deletedOnsiteCheck;
}; 