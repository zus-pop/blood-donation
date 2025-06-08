import { Inventory } from "../models";
import { InventoryQuery } from "../types/inventory.type";

export async function findInventory(query: InventoryQuery) {
  const InventoryData = Inventory.find(query);
  return InventoryData;
}
