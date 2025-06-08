import { createBrowserRouter } from "react-router";
import Home from "./Home";
import Dashboard from "./pages/Dashboard";
import WelcomeDashBoard from "./components/welcome-dashboard";
import BloodRequests from "./pages/BloodRequests";

export default createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: WelcomeDashBoard,
      },
      {
        path: "bloodrequests",
        element: <BloodRequests />,
      }
    ],
  },
]);
