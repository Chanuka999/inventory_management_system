import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDb();
  console.log(`server is connecting on ${PORT}`);
});
