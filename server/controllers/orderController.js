import e from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const addOrder = async (req, res) => {
  try {
    const { productId, quantity, total } = req.body;
    const userId = req.user._id;
    const product = await Product.findById({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: "product not found in order" });
    }
    if (quantity > product.stock) {
      return res.status(400).json({ error: "Not enough stock" });
    } else {
      product.stock == parseInt(quantity);
      await product.save();
    }
    const orderObj = new Order({
      customer: userId,
      product: productId,
      quantity,
      totalPrice: total,
    });
    await orderObj.save();

    return res
      .status(200)
      .json({ success: true, message: "order added succssfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "server eror in adding order" });
  }
};

export { addOrder };
