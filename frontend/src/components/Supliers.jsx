import axios from "axios";
import React, { useState } from "react";

const Supliers = () => {
  const [addEditModel, setAddEditModel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });

  const handdleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/supplier/add",

        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("supplier added successfully");
        setAddEditModel(null);
      } else {
        console.error("Error editing suplier:", response.data);
        alert("error editing suplier.please try again.");
      }
    } catch (error) {
      console.error("Error adding suplier ", error);
      alert("Error adding supplier,please try again");
    }
  };
  return (
    <div className="w-full h-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Suplier Management</h1>
      <div className="flex justify-between items-center">
        <input
          type="text "
          placeholder="serch"
          className="border p-1 bg-white rounded px-4"
        />
        <button
          className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-900"
          onClick={() => setAddEditModel(1)}
        >
          Add Suplier
        </button>
      </div>
      {addEditModel && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
            <h1 className="text-xl font-bold">Add Supplier</h1>
            <button
              className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
              onClick={() => setAddEditModel(null)}
            >
              X
            </button>
            <form className="flex flex-col gap-4 mt-4" onSubmit={handdleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handdleChange}
                placeholder="Supplier name"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handdleChange}
                placeholder="Supplier email"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handdleChange}
                placeholder="Supplier Phone number"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="address"
                name="address"
                value={formData.address}
                onChange={handdleChange}
                placeholder="Supplier address"
                className="border p-1 bg-white rounded px-4"
              />
              <button className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer  hover:bg-blue-900">
                Add Suplier
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supliers;
