import express from "express";
import authMiddleware from "../middlewhere/authMiddleware.js";
import { addOrder } from "../controllers/orderController.js";

const router = express();

router.post("/add", authMiddleware, addOrder);

export default router;
