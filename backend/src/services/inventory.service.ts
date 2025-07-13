import { Inventory, Participation } from "../models";
import { InventoryQuery } from "../types/inventory.type";

// Find inventory items based on query
export async function findInventory(query: InventoryQuery) {
  return Inventory.find(query)
    .populate("bloodType")
    .populate("userId", "firstName lastName email")
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
    .populate("userId", "firstName lastName email")
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

// Create a new inventory item with auto-participation handling
export async function createInventory(data: any) {
  console.log("Creating inventory with data:", data);
  
  if (data.userId && !data.participation) {
    console.log("Looking for participation for user:", data.userId);
    
    const userParticipation = await Participation.findOne({
      userId: data.userId,
    }).sort({ createdAt: -1 });
    
    if (userParticipation) {
      console.log("Found participation:", userParticipation._id);
      data.participation = userParticipation._id;
    } else {
      console.log("No participation found for user, creating without participation");
    }
  }
  
  const inventory = new Inventory(data);
  const savedInventory = await inventory.save();
  console.log("Inventory created successfully:", savedInventory._id);
  return savedInventory;
}

// Update an inventory item by ID
export async function updateInventory(id: string, data: any) {
  console.log("Updating inventory with data:", data);
  
  if (data.userId && !data.participation) {
    const userParticipation = await Participation.findOne({
      userId: data.userId,
    }).sort({ createdAt: -1 });
    
    if (userParticipation) {
      data.participation = userParticipation._id;
    }
  }
  
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