import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { data } from "react-router";

const Categories = () => {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    address:"",
    role:"",

  })
  const [users, setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
 

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const responce = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
     
      setUsers(responce.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
   // fetchCategories();
  }, []);

  const handdleSubmit = async (e) => {
    e.preventDefault();
   
      const response = await axios.post(
        "http://localhost:5000/api/users/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("category added successfully");
       setFormData({
        name:"",
        email:"",
        password:"",
        address:"",
        role:"",
       })
        // fetchCategories();
      } else {
        console.error("Error editing user:");
        alert("error editing user.please try again.");
      }
    }
  };

const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]:value,
    })) 
}

  const handdleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Users deleted successfully");
        //   fetchCategories();
        } else {
          console.error("Error deleting user:", data);
          alert("Error deleting user,please try again.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting.please try again");
      }
    }
  };


  if (loading) return <div>Loding....</div>;
  return (
    <div className="bg-green-300 p-4">
      <h1 className="text-2xl font-bold mb-8">Users Management</h1>
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
                  placeholder="Enter name"
                  className="border w-full p-2 rounded-md"
                   name="name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="border w-full p-2 rounded-md"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="password"
                  className="border w-full p-2 rounded-md"
                name="password"
                  onChange={handleChange}
                />
              </div>

               <div>
                <input
                  type="address"
                  placeholder="address"
                  className="border w-full p-2 rounded-md"
                name="address"
                  onChange={handleChange}
                />
              </div>

              <div>
                <select name="role"  className="border w-full p-2 rounded-md">
                    <option value="">Select Role</option>
                     <option value="">Admin</option>
                      <option value="">Customer</option>
                </select>
              </div>


              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-800"
                >
                Add user
                </button>

               
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
                  <th className="border border-gray-200 p-2">Name</th>
                  <th className="border border-gray-200 p-2">Email</th>
                   <th className="border border-gray-200 p-2">Address</th>
                    <th className="border border-gray-200 p-2">Role</th>
                     <th className="border border-gray-200 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((user, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-2">{index + 1}</td>
                    <td className="border border-gray-200 p-2">
                      {user.name}
                    </td>
                     <td className="border border-gray-200 p-2">
                      {user.email}
                    </td>
                     <td className="border border-gray-200 p-2">
                      {user.address}
                    </td>
                     <td className="border border-gray-200 p-2">
                      {user.role}
                    </td>
                    <td className="border border-gray-200 p-2">
                     
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
}

export default Categories;
