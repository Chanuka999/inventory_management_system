import express from "express";
import { login } from "../controllers/AuthController.js";

const router = express();

router.post("/login", login);

export default router;
