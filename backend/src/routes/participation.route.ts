import express, { Request, Response } from "express";
import { findParticipations, createParticipation, updateParticipation, deleteParticipation } from "../services/participation.service";
import { ParticipationQuery } from "../types/participation.type";
const router = express.Router();

/* GET participations listing. */
router.get("/", async (req: Request, res: Response) => {
  const query = req.query as any as ParticipationQuery;
  const participations = await findParticipations(query);
  res.json(participations);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const participation = await createParticipation(req.body);
    res.status(201).json(participation);
  } catch (err) {
    res.status(400).json({ error: "Cannot create participation", detail: err });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedParticipation = await updateParticipation(id, req.body);
    if (!updatedParticipation) {
      return res.status(404).json({ error: "Participation not found" });
    }
    res.json(updatedParticipation);
  } catch (err) {
    res.status(400).json({ error: "Cannot update participation", detail: err });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedParticipation = await deleteParticipation(id);
    if (!deletedParticipation) {
      return res.status(404).json({ error: "Participation not found" });
    }
    res.json({ message: "Participation deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Cannot delete participation", detail: err });
  }
});

export default router; 