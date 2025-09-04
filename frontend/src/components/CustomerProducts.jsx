import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const CustomerProducts = () => {
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

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
  return (
    <div>
      <div className="py-4 px-6">
        <h2 className="font-bold text-xl">Products</h2>
      </div>
      <div className="py-4 px-6 flex justify-between items-center">
        <div>
          <select name="category" id="" className="bg-white border p-1 rounded">
            <option value="">Select category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
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
                    <button className="px-2 py-1 bg-green-500  hover:bg-green-700 text-white rounded cursor-pointer mr-2">
                      Order
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {filterProducts.length === 0 && <div>No record</div>}
      </div>
    </div>
  );
};

export default CustomerProducts;
