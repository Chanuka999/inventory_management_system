import Supplier from "../models/Suplier.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, supplierId } =
      req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      categoryId,
      supplierId,
    });

    await newProduct.save();
    return res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding Product:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    let products = [];
    try {
      products = await Product.find({ isDeleted: false })
        .populate({ path: "categoryId", strictPopulate: false })
        .populate({ path: "supplierId", strictPopulate: false });
    } catch (err) {
      console.error("Error populating products:", err);
      // fallback: return products without population
      products = await Product.find();
    }
    const supliers = await Supplier.find();
    const categories = await Category.find();
    return res
      .status(200)
      .json({ success: true, products, supliers, categories });
  } catch (error) {
    console.error("Error fetching supliers:", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in getting" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, supplierId } =
      req.body;

    if (!updateProduct) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock, categoryId, supplierId },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.error("Error updating Product", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
export { getProducts, addProduct, updateProduct, deleteProduct };
