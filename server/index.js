import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`server is connecting on ${PORT}`);
});
