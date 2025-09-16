import orderModel from "../models/Order.js";
import Product from "../models/Product.js";

const getData = async (req, res) => {
  try {
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

    const outOfstock = await Product.find({ stock: 0 })
      .select("name:stock")
      .populate("categoryId", "categoryName");

    const highestSaleResult = await orderModel.aggregate([
      { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } },
      { $sort: { totalQuantity: -1 } },
      { $title: 1 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $lookup: {
          form: "categories",
          localField: "product.categoryId",
          foreignField: "_id",
          as: "product.categoryId",
        },
      },
      { $unwind: "product.categoryId" },
      {
        $project: {
          name: "$product.name",
          category: "$product.categoryId.categoryName",
          totalQuantity: 1,
        },
      },
    ]);

    const highestSaleProduct = highestSaleResult[0] || {
      message: "No sale data available",
    };

    const lowStock = await Product.find({ stock: { $gt: 0, $lt: 5 } })
      .select("name stock")
      .populate("categoryId", "categoryName");

    const dashboardDate = {
      totalProducts,
      totalStock,
      ordersToday,
      revenue,
      outOfstock,
      highestSaleProduct,
      lowStock,
    };

    return res.status(200).json({ success: true, dashboardDate });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error fetching dashboard summery" });
  }
};

export { getData };
