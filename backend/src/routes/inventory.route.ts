import express from "express";
import { InventoryQuery } from "../types/inventory.type";
import { findInventory } from "../services/inventory.service";

const router = express.Router();

// Get inventory
router.get("/", async (req, res) => {
  const query = req.query as any as InventoryQuery;
  const inventory = await findInventory(query);
  res.json(inventory);
});


export default router;