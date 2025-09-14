import express from "express";
import {
  addUser,
  getUser,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewhere/authMiddleware.js";
const router = express();

router.post("/add", authMiddleware, addUser);
router.get("/", authMiddleware, getUsers);
router.delete(":id", authMiddleware, deleteUser);
router.get("/profile", authMiddleware, getUser);

export default router;
