import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import authMiddleware from "../middlewhere/authMiddleware.js";
const router = express();

router.post("/add", authMiddleware, addCategory);
router.get("/", authMiddleware, getCategories);
router.put("/:id", authMiddleware, updateCategory);

export default router;
