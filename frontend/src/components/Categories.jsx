import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { data } from "react-router";

const Categories = () => {
  const [categoryName, setCategoryname] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const responce = await axios.get("http://localhost:5000/api/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      console.log(responce.data.categories);
      setCategories(responce.data.categories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handdleSubmit = async (e) => {
    e.preventDefault();
    if (editCategory) {
      const response = await axios.put(
        `http://localhost:5000/api/category/${editCategory}`,
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
        setEditCategory(null);
        setCategoryname("");
        setCategoryDescription("");
        alert("category updated successfully");

        fetchCategories();
      } else {
        console.error("Error adding category:", data);
        alert("error adding category.please try again.");
      }
    } else {
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
        fetchCategories();
      } else {
        console.error("Error editing category:", data);
        alert("error editing category.please try again.");
      }
    }
  };

  const hanndleEdit = async (category) => {
    setEditCategory(category._id);
    setCategoryname(category.categoryName);
    setCategoryDescription(category.categoryDescription);
  };

  const handdleCancel = async () => {
    setEditCategory(null);
    setCategoryname("");
    setCategoryDescription("");
  };

  const handdleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Category deleted successfully");
          fetchCategories();
        } else {
          console.error("Error deleting category:", data);
          alert("Error deleting category,please try again.");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Error deleting.please try again");
      }
    }
  };

  if (loading) return <div>Loding....</div>;
  return (
    <div className="bg-green-300 p-4">
      <h1 className="text-2xl font-bold mb-8">Category Management</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-center text-xl font-bold mb-4">
              {editCategory ? "Edit category" : "Add Category"}
            </h2>
            <form className="space-y-4" onSubmit={handdleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="category name"
                  className="border w-full p-2 rounded-md"
                  value={categoryName}
                  onChange={(e) => setCategoryname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="category description"
                  className="border w-full p-2 rounded-md"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-800"
                >
                  {editCategory ? "save changes" : "Add category"}
                </button>

                {editCategory && (
                  <button
                    type="button"
                    className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                    onClick={handdleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2">S No</th>
                  <th className="border border-gray-200 p-2">Category Name</th>
                  <th className="border border-gray-200 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-2">{index + 1}</td>
                    <td className="border border-gray-200 p-2">
                      {category.categoryName}
                    </td>
                    <td className="border border-gray-200 p-2">
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        onClick={() => hanndleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                        onClick={() => {
                          handdleDelete(category._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
