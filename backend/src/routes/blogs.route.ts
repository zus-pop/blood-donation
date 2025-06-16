import express, { Request, Response } from "express";
import { upload, uploadToCloud } from "../firebase/cloud-storage";
import {
  createBlog,
  deleteBlog,
  findBlogById,
  findBlogs,
  updateBlog,
} from "../services/blog.service";
import { BlogQuery, CreateBlogDto, UpdateBlogDto } from "../types/blog.type";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const query = req.query as any as BlogQuery;
    const blogs = await findBlogs(query);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await findBlogById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const image = req.file;
    const data: CreateBlogDto = req.body;
    try {
      if (image) {
        const imageUrl = await uploadToCloud("blogs", image);
        data.image = imageUrl;
      }
      const newBlog = await createBlog(data);
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const image = req.file;
    const data: UpdateBlogDto = req.body;
    try {
      if (image) {
        const imageUrl = await uploadToCloud("blogs", image);
        data.image = imageUrl;
      }
      const updatedBlog = await updateBlog(id, data);
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedBlog = await deleteBlog(id);
    res.status(200).json(deletedBlog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
