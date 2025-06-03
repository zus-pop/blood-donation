import express, { Request, Response } from "express";
import { findBlogs } from "../services/blog.service";
import { BlogQuery } from "../types/blog.type";
const router = express.Router();

/* GET users listing. */
router.get("/", async (req: Request, res: Response) => {
  const query = req.query as any as BlogQuery;
  const blogs = await findBlogs(query);
  res.json(blogs);
});

export default router;
