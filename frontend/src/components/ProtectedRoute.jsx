import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { token, role: currentRole } = useAuth();
  const loc = useLocation();
  if (!token) return <Navigate to="/login" replace state={{ from: loc }} />;
  if (role && role !== currentRole) return <Navigate to="/" replace />;
  return children;
}
