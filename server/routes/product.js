import express from "express";
import authMiddleware from "../middlewhere/authMiddleware.js";
import { getProducts, addProduct } from "../controllers/productController.js";

const router = express();

router.get("/", authMiddleware, getProducts);
router.post("/add", authMiddleware, addProduct);
// router.put("/:id", authMiddleware, updateSupplier);
// router.delete("/:id", authMiddleware, deleteSupplier);

export default router;
