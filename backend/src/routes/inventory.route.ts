import express, { Request, Response } from "express";
import { InventoryQuery } from "../types/inventory.type";
import {
  findInventory,
  findInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../services/inventory.service";

const router = express.Router();

// Get all inventory items
router.get("/", async (req: Request, res: Response) => {
  try {
    const query = req.query as any as InventoryQuery;
    const inventories = await findInventory(query);
    res.status(200).json(inventories);
  } catch (err) {
    console.error("Route error:", err);
    res.status(400).json({ error: "Cannot fetch inventory", detail: err });
  }
});

// Get a single inventory item by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const inventory = await findInventoryById(id);
    res.status(200).json(inventory);
  } catch (err) {
    res.status(404).json({ error: "Inventory item not found", detail: err });
  }
});

// Create a new inventory item
router.post("/", async (req: Request, res: Response) => {
  try {
    const inventory = await createInventory(req.body);
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: "Cannot create inventory item", detail: err });
  }
});

// Update an inventory item by ID
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedInventory = await updateInventory(id, req.body);
    res.status(200).json(updatedInventory);
  } catch (err) {
    res.status(400).json({ error: "Cannot update inventory item", detail: err });
  }
});

// Delete an inventory item by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedInventory = await deleteInventory(id);
    res.status(200).json(deletedInventory);
  } catch (err) {
    res.status(400).json({ error: "Cannot delete inventory item", detail: err });
  }
});

export default router;