import express, { Request, Response } from "express";
import { createDonationEvent, findDonationEvents } from "../services/donationevent.service";
import { DonationEventQuery } from "../types/donationevent.type";
const router = express.Router();

/* GET donation events listing. */
router.get("/", async (req: Request, res: Response) => {
  const query = req.query as any as DonationEventQuery;
  const events = await findDonationEvents(query);
  res.json(events);
});

router.post("/", async (req: Request, res: Response) => {
  try {
      const request = await createDonationEvent(req.body);
      res.status(201).json(request);
  } catch (err) {
      res.status(400).json({ error: "Cannot create donation event", detail: err });
  }
});
export default router; 