import Supplier from "../models/Supplier.js";
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
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).json({ success: true, suppliers });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in getting" });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, number, address } = req.body;

    const existingSupplier = await Supplier.findById(id);
    if (!existingSupplier) {
      return res
        .status(404)
        .json({ success: false, message: "supplier not found" });
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { name, email, number, address },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "supplier updated successfully" });
  } catch (error) {
    console.error("Error updating supplier", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSupplier = await Supplier.findById(id);

    if (!existingSupplier) {
      return res
        .status(400)
        .json({ success: false, message: "supplier not found" });
    }

    await Supplier.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting supplier", error);
    return res.status(500).json({ success: false, message: "sercer error" });
  }
};

export { addSupplier, getSuppliers, updateSupplier, deleteSupplier };
