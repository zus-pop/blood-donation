import { useProfileStore } from "@/store/profileStore";
import { Navigate } from "react-router";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const DashboardProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { profile, accessToken, clearProfile } = useProfileStore();
  if (
    !accessToken ||
    !profile ||
    (profile.role !== "STAFF" && profile.role !== "ADMIN")
  ) {
    clearProfile();
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default DashboardProtectedRoute;
