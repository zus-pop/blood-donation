import { findBlood } from "@src/services/blood.service";
import { BloodQuery } from "../types/blood.type";
import express from "express";
import { InventoryQuery } from "@src/types/inventory.type";
import { findInventory } from "@src/services/inventory.service";

const router = express.Router();

// Get all blood types
router.get("/", async (req, res) => {
  const query = req.query as any as InventoryQuery;
  const inventory = await findInventory(query);
  res.json(inventory);
});


export default router;