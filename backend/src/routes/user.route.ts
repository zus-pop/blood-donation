import express, { Request, Response } from "express";
import { findUsers } from "@src/services/user.service";
import { UserQuery } from "@src/types/user.type";
const router = express.Router();

/* GET users listing. */
router.get("/", async (req: Request, res: Response) => {
    const query = req.query as any as UserQuery;
    const users = await findUsers(query);
    res.json(users);
});

export default router;