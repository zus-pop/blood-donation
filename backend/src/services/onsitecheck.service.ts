import { OnSiteCheck } from "../models";
import { OnSiteCheckQuery } from "../types/onsitecheck.type";

export async function findOnSiteChecks(query: OnSiteCheckQuery) {
  const checks = OnSiteCheck.find(query);
  return checks;
}

export const createOnsiteCheck = async (data: any) => {
  const onsiteCheck = new OnSiteCheck(data);
  return await onsiteCheck.save();
};

export const updateOnsiteCheck = async (id: string, data: any) => {
  return await OnSiteCheck.findByIdAndUpdate(id, data, { new: true });
}; 