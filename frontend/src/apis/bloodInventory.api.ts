import myAxios from "../lib/custom-axios";
// import type { BloodInventorySchema } from "../pages/dashboard/blood-inventory/schema"; 

// export interface InventoryProps extends BloodInventorySchema {
//   _id: string;
//   createdAt: string;
//   updatedAt: string;
// }
// export interface BloodSeedProps {
//   blood_group: string;
//   abo_type: string;
//   rh_type: string;
//   frequency_global: string;
//   notes?: string;
//   compatibility?: any;
//   inventory?: {
//     rbc?: { quantity_units?: number };
//     plasma?: { quantity_units?: number };
//     platelets?: { quantity_units?: number };
//     whole_blood?: { quantity_units?: number };
//     [key: string]: any;
//   };
//   [key: string]: any;
// }
export async function getBloodSeed() {
  const res = await myAxios.get("/inventory");
  return res.data;
}
export interface InventoryProps {
  _id: string;
  bloodType: string | { _id: string; bloodType: string };
  participation?: string;
  participationId?: string;
  componentType: string;
  quantity: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getInventories() {
  const res = await myAxios.get(`/inventory`);
  return res.data as InventoryProps[];
}

export async function createInventory(inventory: Partial<InventoryProps>) {
  const res = await myAxios.post(`/inventory`, inventory);
  return res.data as InventoryProps;
}
export async function updateInventory(id: string, inventory: Partial<InventoryProps>) {
  const res = await myAxios.put(`/inventory/${id}`, inventory);
  return res.data as InventoryProps;
}

export async function deleteInventory(id: string) {
  const res = await myAxios.delete(`/inventory/${id}`);
  return res.data as InventoryProps;
}