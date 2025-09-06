import express from "express";
import authMiddleware from "../middlewhere/authMiddleware.js";
import { addOrder, getOrders } from "../controllers/orderController.js";

const router = express();

router.post("/add", authMiddleware, addOrder);
router.get("/", authMiddleware, getOrders);

export default router;
