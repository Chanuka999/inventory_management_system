import express from "express";
import authMiddleware from "../middlewhere/authMiddleware.js";
import { addSupplier } from "../controllers/supplierController.js";
const router = express();

router.post("/add", authMiddleware, addSupplier);
// router.get("/", authMiddleware, getCategories);
// router.put("/:id", authMiddleware, updateCategory);
// router.delete("/:id", authMiddleware, deleteCategory);

export default router;
