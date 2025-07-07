import { useProfileStore } from "@/store/profileStore";
import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "./context/AuthContext";
import { toast } from "sonner";

interface AuthRequiredRouteProps {
    children: React.ReactNode;
}

const AuthRequiredRoute: React.FC<AuthRequiredRouteProps> = ({ children }) => {
    const { profile } = useProfileStore();
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated || !profile) {
        toast.error("Please log in to access this page.");

        return <Navigate to="/" state={{ from: location.pathname }} replace />;
    }

    if (profile.role !== "MEMBER") {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default AuthRequiredRoute;
