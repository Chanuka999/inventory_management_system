import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [opentModel, setOpenModel] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    supplierId: "",
  });

  const fetchProducts = async () => {
    try {
      const responce = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setSuppliers(responce.data.supliers);
    } catch (error) {
      console.error("Error fetching suppliers", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const responce = await axios.get("http://localhost:5000/api/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setCategories(responce.data.categories);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handdleChange = (e) => {
    const [name, value] = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handdleSubmit = async (e) => {
    e.preventDefault();
   
      try {
        const response = await axios.post(
          "http://localhost:5000/api/products/add",

          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );

        if (response.data.success) {
          //fetchSuppliers();
          alert("Product added successfully");
          opentModel(false)
          setAddModel(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
          });
        } else {
          //  console.error("Error editing suplier:", response.data);
          alert("error adding products.please try again.");
        }
      } catch (error) {
        console.error("Error adding suplier ", error);
        alert("Error adding supplier,please try again");
      }
    }
  };
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
            <form className="flex flex-col gap-4 mt-4" onSubmit={handdleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handdleChange}
                placeholder="Product name"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={formData.email}
                onChange={handdleChange}
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="number"
                name="price"
                value={formData.number}
                onChange={handdleChange}
                // placeholder="Supplier Address"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="number"
                name="stock"
                // value={formData.address}
                onChange={handdleChange}
                placeholder="Enter stock"
                className="border p-1 bg-white rounded px-4"
              />

              <div className="w-full border">
                <select name="category" className="w-full p-2">
                  <option value="">Select Category</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full border">
                <select name="supplier" className="w-full p-2">
                  <option value="">Select supplier</option>
                  {suppliers &&
                    suppliers.map((suplier) => (
                      <option key={suplier._id} value={suplier._id}>
                        {suplier.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-800"
                >
                  Add Prouct
                </button>

                <button
                  type="button"
                  className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                  onClick={() => setOpenModel(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
