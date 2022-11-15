import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../Functions/auth";

function LogoutPage() {
  useEffect(() => logout(), []);
  return <Navigate to="/login" replace />;
}

export default LogoutPage;
