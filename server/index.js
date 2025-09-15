import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import supplierRoutes from "./routes/suplier.js";
import productRoute from "./routes/product.js";
import userRoutes from "./routes/users.js";
import userRoute from "./routes/User.js";
import orderRouter from "./routes/order.js";
import dashboardRouter from "./routes/dashboard.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  connectDb();
  console.log(`server is connecting on ${PORT}`);
});
