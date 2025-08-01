import express, { Request, Response } from "express";
import { findOnSiteChecks, createOnsiteCheck, updateOnsiteCheck, deleteOnsiteCheck } from "../services/onsitecheck.service";
import { OnSiteCheckQuery, CreateOnSiteCheckDto, UpdateOnSiteCheckDto } from "../types/onsitecheck.type";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.query as any as OnSiteCheckQuery;
  const checks = await findOnSiteChecks(query);
  res.json(checks);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const onsiteCheck = await createOnsiteCheck(req.body as CreateOnSiteCheckDto);
    res.status(201).json(onsiteCheck);
  } catch (err) {
    res.status(400).json({ error: "Cannot create onsite check", detail: err });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedOnsiteCheck = await updateOnsiteCheck(id, req.body as UpdateOnSiteCheckDto);
    if (!updatedOnsiteCheck) {
       res.status(404).json({ error: "Onsite check not found" });
    }
    res.json(updatedOnsiteCheck);
  } catch (err) {
    res.status(400).json({ error: "Cannot update onsite check", detail: err });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedOnsiteCheck = await deleteOnsiteCheck(id);
    if (!deletedOnsiteCheck) {
      res.status(404).json({ error: "Onsite check not found" });
    }
    res.json({ message: "Onsite check deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Cannot delete onsite check", detail: err });
  }
});

export default router; 