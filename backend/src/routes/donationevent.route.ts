import express, { Request, Response } from "express";
import { createDonationEvent, findDonationEvents, updateDonationEvent, deleteDonationEvent } from "../services/donationevent.service";
import { DonationEventQuery, CreateDonationEventDto, UpdateDonationEventDto } from "../types/donationevent.type";
import { upload, uploadToCloud } from "../firebase/cloud-storage";
const router = express.Router();

/* GET donation events listing. */
router.get("/", async (req: Request, res: Response) => {
  const query = req.query as any as DonationEventQuery;
  const events = await findDonationEvents(query);
  res.json(events);
});

router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const data: any = req.body;
      if (req.file) {
        const imageUrl = await uploadToCloud("donationevents", req.file);
        data.image = imageUrl;
      }
      const request = await createDonationEvent(data);
      res.status(201).json(request);
    } catch (err) {
      res.status(400).json({ error: "Cannot create donation event", detail: err });
    }
  }
);

router.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data: any = req.body;
      if (req.file) {
        const imageUrl = await uploadToCloud("donationevents", req.file);
        data.image = imageUrl;
      }
      const updatedEvent = await updateDonationEvent(id, data);
      if (!updatedEvent) {
        res.status(404).json({ error: "Donation event not found" });
      }
      res.json(updatedEvent);
    } catch (err) {
      res.status(400).json({ error: "Cannot update donation event", detail: err });
    }
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedEvent = await deleteDonationEvent(id);
    if (!deletedEvent) {
       res.status(404).json({ error: "Donation event not found" });
    }
    res.json({ message: "Donation event deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Cannot delete donation event", detail: err });
  }
});

export default router; 