import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../contex/AuthContex";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoding] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { login } = useAuth();

  const emailHanddler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHanddler = (event) => {
    setPassword(event.target.value);
  };

  const handderSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    setError(null);

    try {
      const responce = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(responce.data);

      if (responce.data.success) {
        await login(responce.data.user, responce.data.token);
        if (responce.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/customer/dashboard");
        }
      } else {
        alert(responce.data.error);
      }
    } catch (error) {
      if (error.responce) {
        setError(error.responce.data.message);
      }
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="login-page min-h-screen flex items-center justify-center relative">
      <div className="video-container">
        <video
          className="top-video"
          src="/video1.webm"
          autoPlay
          loop
          muted
          playsInline
        ></video>
      </div>

      <div className="video-overlay"></div>

      <div className="login-content-wrapper relative z-10 flex flex-col items-center">
        <div className="ims-blur-frame">
          <h2 className="ims-heading">Inventory Management System</h2>
        </div>
        <div className="border shadow-xl p-6 w-80 bg-white/20 backdrop-blur-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
          {error && (
            <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handderSubmit}>
            <div className="mb-4">
              <label className="block text-white">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded bg-white/60 focus:bg-white focus:outline-none"
                name="email"
                placeholder="Enter Email"
                onChange={emailHanddler}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded bg-white/60 focus:bg-white focus:outline-none"
                name="password"
                onChange={passwordHanddler}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-300"
              >
                {loading ? "Loading" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
