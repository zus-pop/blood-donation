import express, { Request, Response } from "express";
import { findOnSiteChecks, createOnsiteCheck, updateOnsiteCheck } from "../services/onsitecheck.service";
import { OnSiteCheckQuery } from "../types/onsitecheck.type";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.query as any as OnSiteCheckQuery;
  const checks = await findOnSiteChecks(query);
  res.json(checks);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const onsiteCheck = await createOnsiteCheck(req.body);
    res.status(201).json(onsiteCheck);
  } catch (err) {
    res.status(400).json({ error: "Cannot create onsite check", detail: err });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedOnsiteCheck = await updateOnsiteCheck(id, req.body);
    if (!updatedOnsiteCheck) {
      return res.status(404).json({ error: "Onsite check not found" });
    }
    res.json(updatedOnsiteCheck);
  } catch (err) {
    res.status(400).json({ error: "Cannot update onsite check", detail: err });
  }
});

export default router; 