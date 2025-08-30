import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [opentModel, setOpenModel] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      if (responce.data.success) {
        setSuppliers(responce.data.supliers);
        setCategories(responce.data.categories);
        setProducts(responce.data.products);
      } else {
        console.error("Error fetching products:", responce.data.message);
        alert("Error fetching products.please try again");
      }
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
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? value.replace(/[^0-9.]/g, "") : value,
    }));
  };

  const handdleEdit = (product) => {
    setOpenModel(true);
    setEditProduct(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId._id,
      supplierId: product.supplierId._id,
    });
  };

  // Fix: Add handdleDelete for products
  const handdleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Product deleted successfully");
          fetchProducts();
        } else {
          alert(
            `Error deleting product: ${
              response.data.message || "please try again."
            }`
          );
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(`Error deleting product: ${error.response.data.message}`);
        } else {
          alert("Error deleting product, please try again");
        }
      }
    }
  };
  const closeModel = () => {
    setOpenModel(false);
    setEditProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      supplierId: "",
    });
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation for required fields
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.stock ||
      !formData.categoryId ||
      !formData.supplierId
    ) {
      alert("Please fill in all fields and select category and supplier.");
      return;
    }

    // Convert price and stock to numbers before sending
    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };
    if (editProduct) {
      try {
        const responce = await axios.put(
          `http://localhost:5000/api/products/${editProduct}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (responce.data.success) {
          alert("product updated successfully");
          fetchProducts();
          setOpenModel(false);
          setEditProduct(false);
          setFormData({
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            supplierId: "",
          });
        } else {
          alert("Error updating product.please try again");
        }
      } catch (error) {
        alert("Error updating product.please try again");
      }
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/products/add",
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );

        if (response.data.success) {
          //fetchSuppliers();
          alert("Product added successfully");
          fetchProducts();
          setOpenModel(false);
          setEditProduct(null);
          // setAddModel(false);
          setFormData({
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            supplierId: "",
          });
        } else {
          //  console.error("Error editing suplier:", response.data);
          alert("error adding products.please try again.");
        }
      } catch (error) {
        console.error("Error adding suplier ", error);
        alert("Error adding product,please try again");
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
          Add Product
        </button>
      </div>

      <div>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S No</th>
              <th className="border border-gray-300 p-2">Product name</th>
              <th className="border border-gray-300 p-2">Category name</th>
              <th className="border border-gray-300 p-2">Supplier name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">
                  {product.categoryId.categoryName}
                </td>
                <td className="border border-gray-300 p-2">
                  {product.supplierId.name}
                </td>
                <td className="border border-gray-300 p-2">{product.price}</td>
                <td className="border border-gray-300 p-2">
                  <span className="px-2 py-1 rounded-full font-semibold">
                    {product.stock == 0 ? (
                      <span className="text-green-500">{product.stock}</span>
                    ) : product.stock < 5 ? (
                      <span className="text-yellow-100 text-yellow-600">
                        {product.stock}
                      </span>
                    ) : (
                      <span className="text-green-100">{product.stock}</span>
                    )}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer mr-2"
                    onClick={() => handdleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                    onClick={() => handdleDelete(product._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {filteredSuppliers.length === 0 && <div>No record</div>} */}
      </div>

      {opentModel && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
            <h1 className="text-xl font-bold">Add Product</h1>
            <button
              className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
              onClick={closeModel}
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
                value={formData.description}
                onChange={handdleChange}
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handdleChange}
                className="border p-1 bg-white rounded px-4"
                min="0"
                step="any"
              />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handdleChange}
                placeholder="Enter stock"
                className="border p-1 bg-white rounded px-4"
                min="0"
                step="1"
              />

              <div className="w-full border">
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handdleChange}
                  className="w-full p-2"
                >
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
                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handdleChange}
                  className="w-full p-2"
                >
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
                  {editProduct ? "save changes" : "Add Product"}
                </button>

                <button
                  type="button"
                  className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                  onClick={closeModel}
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
