import express, { Request, Response } from "express";
import { findUsers, createUser, findUserById, updateUser, deleteUser } from "../services/user.service";
import { UserQuery } from "../types/user.type";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const query = req.query as any as UserQuery;
    const users = await findUsers(query);
    res.status(200).json(users);
});
router.post("/", async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: "Cannot create user", detail: err.message });
    }
});
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await findUserById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: "User not found", detail: err.message });
    }
});
router.patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedUser = await updateUser(id, req.body);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: "Cannot update user", detail: err.message });
    }
});
router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(400).json({ error: "Cannot delete user", detail: err.message });
    }
});
export default router;