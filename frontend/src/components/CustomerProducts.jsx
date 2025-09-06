import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const CustomerProducts = () => {
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [opentModel, setOpenModel] = useState(false);
  const [orderData, setOderData] = useState({
    productId: "",
    quantity: 1,
    total: 0,
    stock: 0,
    price: 0,
  });

  const fetchProducts = async () => {
    try {
      const responce = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      if (responce.data.success) {
        setCategories(responce.data.categories);
        setProducts(responce.data.products);
        setFilterProducts(responce.data.products);
      } else {
        console.error("Error fetching products:", responce.data.message);
        alert("Error fetching products.please try again");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handdleSearch = (e) => {
    setFilterProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handdleChangeCategory = (e) => {
    const value = e.target.value;
    if (!value) {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter((product) => {
          if (!product.categoryId) return false;
          if (typeof product.categoryId === "string") {
            return product.categoryId === value;
          }
          if (
            typeof product.categoryId === "object" &&
            product.categoryId._id
          ) {
            return String(product.categoryId._id) === String(value);
          }
          return false;
        })
      );
    }
  };

  const handdleOrderChange = (product) => {
    setOderData({
      productId: product._id,
      quantity: 1,
      total: product.total,
      stock: product.stock,
      price: product.price,
    });
    setOpenModel(true);
  };

  const closeModel = () => {
    setOpenModel(false);
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "http://localhost:5000/api/products",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );
      if (responce.data.success) {
        setOpenModel(false);
        setOderData({
          productId: "",
          quantity: 1,
          stock: 0,
          total: 0,
          price: 0,
        });
      }
    } catch (error) {
      alert("Error", error.message);
    }
  };

  const increaseQuntity = (e) => {
    if (e.target.value > orderData.stock) {
      alert("Not enought stock");
    } else {
      setOderData((prev) => ({
        ...prev,
        quantity: parseInt(e.target.value),
        total: parseInt(e.target.value) * parseInt(orderData.price),
      }));
    }
  };
  return (
    <div>
      <div className="py-4 px-6">
        <h2 className="font-bold text-xl">Products</h2>
      </div>
      <div className="py-4 px-6 flex justify-between items-center">
        <div>
          <select
            name="category"
            id=""
            className="bg-white border p-1 rounded"
            onChange={handdleChangeCategory}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text "
            placeholder="serch"
            className="border p-1 bg-white rounded px-4"
            onChange={handdleSearch}
          />
        </div>
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S No</th>
              <th className="border border-gray-300 p-2">Product name</th>
              <th className="border border-gray-300 p-2">Category name</th>

              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterProducts &&
              filterProducts.map((product, index) => (
                <tr key={product._id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{product.name}</td>
                  <td className="border border-gray-300 p-2">
                    {product.categoryId?.categoryName || "Unknown"}
                  </td>

                  <td className="border border-gray-300 p-2">
                    {product.price}
                  </td>
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
                      onClick={() => handdleOrderChange(product)}
                      className="px-2 py-1 bg-green-500  hover:bg-green-700 text-white rounded cursor-pointer mr-2"
                    >
                      Order
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {filterProducts.length === 0 && <div>No record</div>}
      </div>
      {opentModel && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20">
          <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
            <h1 className="text-xl font-bold">place order</h1>
            <button
              className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
              onClick={closeModel}
            >
              X
            </button>
            <form className="flex flex-col gap-4 mt-4" onSubmit={handdleSubmit}>
              <input
                type="number"
                name="quantity"
                value={orderData.quantity}
                onChange={increaseQuntity}
                min="1"
                placeholder="increase quantity"
                className="border p-1 bg-white rounded px-4"
              />

              <p>{orderData.quantity * orderData.price}</p>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-800"
                >
                  "save changes"
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

export default CustomerProducts;
