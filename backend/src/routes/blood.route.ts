import { findBlood, createBlood, updateBlood, deleteBlood, findBloodById } from "../services/blood.service";
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

// // Get all blood types from JSON file
// router.get("/seed", (req, res) => {
//   const filePath = path.join(__dirname, "../../data/blood_types_seed.json");
//   try {
//     const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to read blood types seed file" });
//   }
// });

// Create a new blood type
router.post("/", async (req, res) => {
  try {
    const blood = await createBlood(req.body);
    res.status(201).json(blood);
  } catch (err) {
    res.status(400).json({ error: "Failed to create blood type" });
  }
});

//Get blood by ID
router.get("/:id", async (req, res) => {
  try {
    const blood = await findBloodById(req.params.id);
    res.status(200).json(blood);
  } catch (err) {
    res.status(404).json({ error: "Blood type not found" });
  }
});

// Update a blood type by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBlood = await updateBlood(req.params.id, req.body);
    res.status(200).json(updatedBlood);
  } catch (err) {
    res.status(400).json({ error: "Failed to update blood type" });
  }
});

// Delete a blood type by ID
router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const deletedBlood = await deleteBlood(id);
    res.status(200).json(deletedBlood);
  } catch (err) {
    res.status(400).json({ error: "Failed to delete blood type" });
  }
});

export default router;