import express from "express";
import authMiddleware from "../middlewhere/authMiddleware.js";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express();

router.get("/", authMiddleware, getProducts);
router.post("/add", authMiddleware, addProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
