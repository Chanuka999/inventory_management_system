import Supplier from "../models/Suplier.js";
import Category from "../models/Category.js";

const getProducts = async (req, res) => {
  try {
    const supliers = await Supplier.find();
    const categories = await Category.find();
    return res.status(200).json({ success: true, supliers, categories });
  } catch (error) {
    console.error("Error fetching supliers:", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in getting" });
  }
};

export { getProducts };
