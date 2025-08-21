import React from "react";
import { useEffect } from "react";
import { useAuth } from "../contex/AuthContex";
import { Navigate, useNavigate } from "react-router";

const ProtectedRoute = ({ children, requirRole }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!requirRole.includes(user.role)) {
      navigate("/unauthorized");
      return;
    }
  }, [user, navigate, requirRole]);

  if (!user) return null;
  if (!requirRole.includes(user.role)) return null;

  return children;
};

export default ProtectedRoute;
