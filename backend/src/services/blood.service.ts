import { Blood } from "../models";
import { BloodQuery } from "../types/blood.type";

// Find blood types based on query
export async function findBlood(query: BloodQuery) {
  return Blood.find(query);
}

//Find a blood type by ID
export async function findBloodById(id: string) {
  const blood = await Blood.findById(id);
  if (!blood) {
    throw new Error("Blood type not found");
  }
  return blood;
}

// Create a new blood type
export async function createBlood(data: any) {
  const blood = new Blood(data);
  return await blood.save();
}

// Update a blood type by ID
export async function updateBlood(id: string, data: any) {
  const blood = await Blood.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!blood) {
    throw new Error("Blood type not found");
  }
  return blood;
}

// Delete a blood type by ID
export async function deleteBlood(id: string) {
  const blood = await Blood.findByIdAndDelete(id);
  if (!blood) {
    throw new Error("Blood type not found");
  }
  return blood;
}
