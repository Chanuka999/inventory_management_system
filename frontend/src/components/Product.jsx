import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [opentModel, setOpenModel] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const fetchProducts = async () => {
    try {
      const responce = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });

      setSuppliers(responce.data.supliers);
      setCategories(responce.data.supliers);
    } catch (error) {
      console.error("Error fetching suppli ers", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Suplier Management</h1>
      <div className="flex justify-between items-center">
        <input
          type="text "
          placeholder="serch"
          className="border p-1 bg-white rounded px-4"
          // onChange={handdleSearch}
        />
        <button
          className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-900"
          onClick={() => setOpenModel(true)}
        >
          Add Suplier
        </button>
      </div>

      {opentModel && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
            <h1 className="text-xl font-bold">Add Product</h1>
            <button
              className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
              onClick={() => setOpenModel(false)}
            >
              X
            </button>
            <form className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                name="name"
                // value={formData.name}
                // onChange={handdleChange}
                placeholder="Supplier name"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                // value={formData.email}
                // onChange={handdleChange}
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="number"
                name="price"
                // value={formData.number}
                // onChange={handdleChange}
                placeholder="Supplier Address"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="number"
                name="stock"
                // value={formData.address}
                // onChange={handdleChange}
                placeholder="Enter stock"
                className="border p-1 bg-white rounded px-4"
              />

              <div>
                <select name="category">
                  <option value="">Select Category</option>
                </select>
              </div>

              <div>
                <select name="supplier">
                  <option value="">Select supplier</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id}></option>
                    ))}
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-800"
                >
                  {editSupplier ? "save changes" : "Add supplier"}
                </button>

                {editSupplier && (
                  <button
                    type="button"
                    className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
