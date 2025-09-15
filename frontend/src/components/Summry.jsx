import axios from "axios";
import React, { useEffect, useState } from "react";

const Summry = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProduct: 0,
    totalStock: 0,
    orderToday: 0,
    revenue: 0,
    outOfStock: [],
    hightestSaleProduct: null,
    lowStock: [],
  });

  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const responce = await axios.get("http://localhost:3000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setDashboardData(responce.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-5">
      <h2 className="text-sxl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">Total Products</p>
          <p className="text-2xl font-bold">{dashboardData.totalProduct}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">Total stock</p>
          <p className="text-2xl font-bold">{dashboardData.totalStock}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">orders Total</p>
          <p className="text-2xl font-bold">{dashboardData.orderToday}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">Revinue</p>
          <p className="text-2xl font-bold">${dashboardData.revenue}</p>
        </div>
      </div>

      <div className="gird grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-500 mb-3">
            out of stock products
          </h3>
          {dashboardData.outOfStock.length > 0 ? (
            <ul className="space-y-2">
              {dashboardData.outOfStock.map((product, index) => {
                <li key={index} className="text-grey-600">
                  {product.name}{" "}
                  <span className="text-grey-600">
                    ({product.category.name})
                  </span>
                </li>;
              })}
            </ul>
          ) : (
            <p className="text-grey-500">No products out of stock</p>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-500 mb-3">
            Highest sale product
          </h3>
          {dashboardData.hightestSaleProduct?.name ? (
            <div className="text-grey-600">
              <p>
                <strong>Name:</strong>
                {dashboardData.hightestSaleProduct.name}
              </p>
              <p>
                <strong>Category:</strong>
                {dashboardData.hightestSaleProduct.category}
              </p>
              <p>
                <strong>Total unit sold:</strong>
                {dashboardData.hightestSaleProduct.totalQuantity}
              </p>
            </div>
          ) : (
            <p>{dashboardData.hightestSaleProduct?.message || "Loading"}</p>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-500 mb-3">
            low stock products
          </h3>
          {dashboardData.lowStock.length > 0 ? (
            <ul className="space-y-2">
              {dashboardData.lowStock.map((product, index) => {
                <li key={index} className="text-grey-600">
                  <strong>{product.name}</strong> - {product.stock} left{""}
                  <span className="text-grey-600">
                    ({product.category.name})
                  </span>
                </li>;
              })}
            </ul>
          ) : (
            <p className="text-grey-500">No low stock products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summry;
