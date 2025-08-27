import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const Supliers = () => {
  const [addModel, setAddModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [supliers, setSupliers] = useState([]);
  const [editSupplier, setEditSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  const handdleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const responce = await axios.get("http://localhost:5000/api/supplier", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });

      setSupliers(responce.data.supliers);
      setFilteredSuppliers(responce.data.supliers);
    } catch (error) {
      console.error("Error fetching suppli ers", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handdleSubmit = async (e) => {
    e.preventDefault();
    if (editSupplier) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/supplier/${editSupplier}`,

          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );

        if (response.data.success) {
          alert("supplier added successfully");
          setAddModel(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
          });
        } else {
          //  console.error("Error editing suplier:", response.data);
          alert("error editing suplier.please try again.");
        }
      } catch (error) {
        console.error("Error adding suplier ", error);
        alert("Error adding supplier,please try again");
      }
    } else {
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
          fetchSuppliers();
          alert("supplier added successfully");
          setAddModel(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
          });
        } else {
          //  console.error("Error editing suplier:", response.data);
          alert("error editing suplier.please try again.");
        }
      } catch (error) {
        console.error("Error adding suplier ", error);
        alert("Error adding supplier,please try again");
      }
    }
  };

  const handdleEdit = (suplier) => {
    setFormData({
      name: suplier.name,
      email: suplier.email,
      number: suplier.number,
      address: suplier.address,
    });
    setEditSupplier(suplier._id);
    setAddModel(true);
  };

  const closeModal = () => {
    setAddModel(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setEditSupplier(null);
  };

  const handdleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/supplier/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Supplier deleted successfully");
          fetchSuppliers();
        } else {
          console.error("Error deleting suppier:", response.data);
          alert("Error deleting supplier,please try again.");
        }
      } catch (error) {
        console.error("Error deleting supplier:", error);
        alert("Error deleting.please try again");
      }
    }
  };

  const handdleSearch = (e) => {
    setFilteredSuppliers(
      supliers.filter((suplier) =>
        suplier.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <div className="w-full h-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Suplier Management</h1>
      <div className="flex justify-between items-center">
        <input
          type="text "
          placeholder="serch"
          className="border p-1 bg-white rounded px-4"
          onChange={handdleSearch}
        />
        <button
          className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-900"
          onClick={() => setAddModel(true)}
        >
          Add Suplier
        </button>
      </div>

      {loading ? (
        <div>Loading ....</div>
      ) : (
        <div>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">S No</th>
                <th className="border border-gray-300 p-2">Supplier name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone number</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((suplier, index) => (
                <tr key={suplier._id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{suplier.name}</td>
                  <td className="border border-gray-300 p-2">
                    {suplier.email}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {suplier.number}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {suplier.address}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer mr-2"
                      onClick={() => handdleEdit(suplier)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                      onClick={() => handdleDelete(suplier._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSuppliers.length === 0 && <div>No record</div>}
        </div>
      )}

      {addModel && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
            <h1 className="text-xl font-bold">Add Supplier</h1>
            <button
              className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
              onClick={closeModal}
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

export default Supliers;
