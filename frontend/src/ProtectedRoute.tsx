import { useProfileStore } from "@/store/profileStore";
import { Navigate } from "react-router";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { profile } = useProfileStore();
    const accessToken = localStorage.getItem("accessToken");
    if (
        !accessToken ||
        !profile ||
        (profile.role !== "STAFF" && profile.role !== "ADMIN")
    ) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
