import { useProfileStore } from "@/store/profileStore";
import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ClientProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { profile } = useProfileStore();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated && profile && profile.role !== "MEMBER") {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

export default ClientProtectedRoute;
