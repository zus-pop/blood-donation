import express, { Request, Response } from "express";
import {
    createCategory,
    deleteCategoryById,
    findCategories,
    findCategoryById,
    updateCategoryById,
} from "../services/category.service";
import {
    CategoryQuery,
    CreateCategoryDto,
    UpdateCategoryDto,
} from "../types/category.type";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.query as any as CategoryQuery;
  const categories = await findCategories(query);
  res.json(categories);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await findCategoryById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const data: CreateCategoryDto = req.body;
  try {
    const newCategory = await createCategory(data);
    res.status(201).json({ data: newCategory });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateCategoryDto = req.body;
  try {
    const updatedCategory = await updateCategoryById(id, data);
    res.status(200).json({ data: updatedCategory });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await deleteCategoryById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
