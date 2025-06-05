import express, { Request, Response } from "express";
import { findParticipations } from "../services/participation.service";
import { ParticipationQuery } from "../types/participation.type";
const router = express.Router();

/* GET participations listing. */
router.get("/", async (req: Request, res: Response) => {
  const query = req.query as any as ParticipationQuery;
  const participations = await findParticipations(query);
  res.json(participations);
});

export default router; 