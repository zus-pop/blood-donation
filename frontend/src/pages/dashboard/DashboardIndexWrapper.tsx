import { useEffect, useState } from "react";
import WelcomeDashBoard from "@/components/welcome-dashboard";
import DashboardHome from "./DashboardHome";


const WELCOME_KEY = "dashboard_welcome_shown";

const DashboardIndexWrapper = () => {
    const [showWelcome, setShowWelcome] = useState(() => {
        // Only show welcome if not shown before
        return !localStorage.getItem(WELCOME_KEY);
    });

    useEffect(() => {
        if (showWelcome) {
            const timer = setTimeout(() => {
                setShowWelcome(false);
                localStorage.setItem(WELCOME_KEY, "1");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showWelcome]);

    return showWelcome ? <WelcomeDashBoard /> : <DashboardHome />;
};

export default DashboardIndexWrapper;
