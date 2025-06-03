import express, { Request, Response } from "express";
import { BloodRequestQuery } from "../types/bloodrequest.type";
import { BloodRequestService } from "../services/bloodrequest.service";
const router = express.Router();

const bloodRequestService = new BloodRequestService();

router.get("/", async (req: Request, res: Response) => {
    const query = req.query as any as BloodRequestQuery;
    const bloodRequests = await bloodRequestService.getBloodRequests(query);
    res.json(bloodRequests);
});

export default router;