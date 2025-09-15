import express from "express";
import authMiddleware from "../middlewhere/authMiddleware.js";
import { getData } from "../controllers/dashboardController.js";
const router = express();

router.get("/", authMiddleware, getData);

export default router;
