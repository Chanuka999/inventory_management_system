import axios from "axios";
import React, { useState } from "react";
import { data } from "react-router";

const Categories = () => {
  const [categoryName, setCategoryname] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handdleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/category/add",
      {
        categoryName,
        categoryDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("category added successfully");
      setCategoryname("");
      setCategoryDescription("");
    } else {
      console.error("Error adding category:", data);
      alert("error adding category.please try again.");
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8">Category Management</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-center text-xl font-bold mb-4">Add Category</h2>
            <form className="space-y-4" onSubmit={handdleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="category name"
                  className="border w-full p-2 rounded-md"
                  onChange={(e) => setCategoryname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="category description"
                  className="border w-full p-2 rounded-md"
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-800"
              >
                Add category
              </button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Categories;
