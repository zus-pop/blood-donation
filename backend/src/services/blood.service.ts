import { Blood } from "../models";
import {BloodQuery } from "../types/blood.type";

export async function findBlood(query: BloodQuery) {
  const bloodData = Blood.find(query);
  return bloodData;
}
