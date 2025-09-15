import orderModel from "../models/Order.js";
import Product from "../models/Product.js";

const getData = async (req, res) => {
  const totalProducts = await Product.countDocuments();

  const stockResult = await Product.aggregate([
    { $group: { _id: null, totalStock: { $sum: "$stock" } } },
  ]);
  const totalStock = stockResult[0]?.totalStock || 0;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const ordersToday = await orderModel.countDocuments({
    orderDate: { $gte: startOfDay, $lte: endOfDay },
  });
  const revenueResult = await orderModel.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
  ]);
  const revenue = revenueResult?.totalStock || 0;

  const outOfstock = await Product.find({ stock: 0 }).select("name:stock");
};

export { getData };
