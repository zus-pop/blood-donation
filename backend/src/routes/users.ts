import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", (_: Request, res: Response, next: NextFunction) => {
  res.json({ message: "respond with a resource" });
});

export default router;
