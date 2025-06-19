import express, { Request, Response } from "express";
import { AuthLoginDto, AuthRegisterDto } from "../types/auth.type";
import { login, register } from "../services/auth.service";
import { validate } from "../middlewares/validate-token";
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const data = req.body as any as AuthLoginDto;
  try {
    const token = await login(data);
    res.status(200).json({ access_token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const data: AuthRegisterDto = req.body;
  try {
    const token = await register(data);
    res.status(201).json({ access_token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/profile", validate, async (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).json(user);
});

export default router;
