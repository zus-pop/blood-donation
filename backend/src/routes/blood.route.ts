import { findBlood } from "../services/blood.service";
import { BloodQuery } from "../types/blood.type";
import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

// Get all blood types from DB
router.get("/", async (req, res) => {
  const query = req.query as any as BloodQuery;
  const blood = await findBlood(query);
  res.json(blood);
});

// Get all blood types from JSON file
router.get("/seed", (req, res) => {
  const filePath = path.join(__dirname, "../../data/blood_types_seed.json");
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read blood types seed file" });
  }
});

export default router;