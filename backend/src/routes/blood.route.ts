import { findBlood } from "@src/services/blood.service";
import { BloodQuery } from "../types/blood.type";
import express from "express";

const router = express.Router();

// Get all blood types
router.get("/", async (req, res) => {
  const query = req.query as any as BloodQuery;
  const blood = await findBlood(query);
  res.json(blood);
});


export default router;