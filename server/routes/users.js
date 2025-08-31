import express from "express";
import authMiddleware from "../middlewhere/authMiddleware.js";
import { getUser, addUser, deleteUser } from "../controllers/userController.js";

const router = express();

router.get("/", authMiddleware, getUser);
router.post("/add", authMiddleware, addUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
