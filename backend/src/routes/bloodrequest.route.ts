import express, { Request, Response } from "express";
import { BloodRequestQuery } from "../types/bloodrequest.type";
import { createBloodRequest, deleteBloodRequest, findBloodRequestById, getBloodRequests, updateBloodRequest } from "../services/bloodrequest.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const query = req.query as any as BloodRequestQuery;
    const bloodRequests = await getBloodRequests(query);
    res.status(200).json(bloodRequests);
});
router.post("/", async (req: Request, res: Response) => {
    try {
        const request = await createBloodRequest(req.body);
        res.status(201).json(request);
    } catch (err) {
        res.status(400).json({ error: "Cannot create blood request", detail: err.message });
    }
});
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const bloodRequest = await findBloodRequestById(id);
        res.status(200).json(bloodRequest);
    } catch (err) {
        res.status(404).json({ error: "Blood request not found", detail: err.message });
    }
});
router.patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedRequest = await updateBloodRequest(id, req.body);
        res.status(200).json(updatedRequest);
    } catch (err) {
        res.status(400).json({ error: "Cannot update blood request", detail: err.message });
    }
});
router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedRequest = await deleteBloodRequest(id);
        res.status(200).json(deletedRequest);
    } catch (err) {
        res.status(400).json({ error: "Cannot delete blood request", detail: err.message });
    }
});

export default router;