import express, { Request, Response } from "express";
import { findUsers, createUser } from "../services/user.service";
import { UserQuery } from "../types/user.type";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const query = req.query as any as UserQuery;
    const users = await findUsers(query);
    res.json(users);
});
router.post("/", async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: "Cannot create user", detail: err });
    }
});
export default router;