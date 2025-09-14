import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [edit, setEdit] = useState(false);
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );
      if (response.data.success) {
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
          address: response.data.user.address,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("Error fetching user profile.please try again.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          User Profile
        </h2>
        <form className="space-y-5" action="">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="usename"
              value={user.name || ""}
              disabled={!edit}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email || ""}
              disabled={!edit}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="Address"
              className="block text-gray-700 font-semibold mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="Address"
              name="address"
              value={user.address || ""}
              disabled={!edit}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {edit && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                password
              </label>
              <input
                type="password"
                name="password"
                placeholder="enter the password"
                value={user.password || ""}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-50"
              />
            </div>
          )}
          <button
            type="submit"
            onClick={() => setEdit(!edit)}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
