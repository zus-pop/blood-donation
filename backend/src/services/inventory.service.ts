import { Inventory } from "../models";
import { InventoryQuery } from "../types/inventory.type";

// Find inventory items based on query
export async function findInventory(query: InventoryQuery) {
  return Inventory.find(query)
    .populate("bloodType")
    .populate({
      path: "participation",
      populate: {
        path: "userId",
        model: "User",
        select: "firstName lastName email"
      }
    });
}

// Find a single inventory item by ID
export async function findInventoryById(id: string) {
  const inventory = await Inventory.findById(id)
    .populate("bloodType")
    .populate({
      path: "participation",
      populate: {
        path: "userId",
        model: "User",
        select: "firstName lastName email"
      }
    });
  if (!inventory) {
    throw new Error("Inventory item not found");
  }
  return inventory;
}

// Create a new inventory item
export async function createInventory(data: any) {
  const inventory = new Inventory(data);
  return await inventory.save();
}

// Update an inventory item by ID
export async function updateInventory(id: string, data: any) {
  const inventory = await Inventory.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!inventory) {
    throw new Error("Inventory item not found");
  }
  return inventory;
}

// Delete an inventory item by ID
export async function deleteInventory(id: string) {
  const inventory = await Inventory.findByIdAndDelete(id);
  if (!inventory) {
    throw new Error("Inventory item not found");
  }
  return inventory;
}