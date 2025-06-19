import { NextFunction, Request, Response } from "express";
import { validateToken } from "../services/auth.service";
import { findUserById } from "../services/user.service";

export async function validate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const payload = validateToken(token);
    const user = await findUserById(payload.sub);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
