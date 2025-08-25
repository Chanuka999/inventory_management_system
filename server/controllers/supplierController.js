import Supplier from "../models/Suplier.js";
const addSupplier = async (req, res) => {
  try {
    const { name, email, number, address } = req.body;

    const existingSupplier = await Supplier.findOne({ name });
    if (existingSupplier) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const newSupplier = new Supplier({
      name,
      email,
      number,
      address,
      createdAt: new Date().toISOString(),
    });

    await newSupplier.save();
    return res
      .status(200)
      .json({ success: true, message: "Supplier added successfully" });
  } catch (error) {
    console.error("Error adding Supplier:", error);
    return res.status(500).json({ sucess: false, message: "Server error" });
  }
};

export { addSupplier };
