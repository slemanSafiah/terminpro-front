import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  let token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to={"/login"} replace={true} />;
}
