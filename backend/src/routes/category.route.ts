import express, { Request, Response } from "express";
import { findCategories } from "../services/category.service";
import { CategoryQuery } from "../types/category.type";
const router = express.Router();

/* GET users listing. */
router.get("/", async (req: Request, res: Response) => {
  const query = req.query as any as CategoryQuery;
  const categories = await findCategories(query);
  res.json(categories);
});

export default router;
