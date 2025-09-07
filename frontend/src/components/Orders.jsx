import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const responce = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      if (responce.data.success) {
        setOrders(responce.data.orders);
      } else {
        console.error("Error fetching products:", responce.data.message);
        alert("Error fetching orders.please try again");
      }
    } catch (error) {
      console.error("Error fetching suppliers", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Suplier Management</h1>

      <div>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S No</th>
              <th className="border border-gray-300 p-2">product name</th>
              <th className="border border-gray-300 p-2">Category name</th>
              <th className="border border-gray-300 p-2">Quanitity</th>
              <th className="border border-gray-300 p-2">Total Price</th>
              <th className="border border-gray-300 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {order.product?.name || "Unknown"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {order.product?.categoryId?.categoryName || "Unknown"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {order.quantity}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {order.totalPrice}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(order.OrderDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {orders.length === 0 && <div>No record</div>}
      </div>
    </div>
  );
};

export default Orders;
