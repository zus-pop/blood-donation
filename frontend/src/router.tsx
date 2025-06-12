import { createBrowserRouter } from "react-router";
import WelcomeDashBoard from "./components/welcome-dashboard";
import BlogTable from "./pages/dashboard/blog/blog-table";
import CategoryTable from "./pages/dashboard/category/category-table";
import Dashboard from "./pages/dashboard/Dashboard";
import BloodInventoryTable from "./pages/dashboard/blood-inventory/blood-inventory-table";
import Home from "./pages/Home";
import BloodRequests from "./pages/dashboard/bloodrequest/index";
import UserPage from "./pages/dashboard/user";
import EventTable from "./pages/dashboard/donationevent/event-table";

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
        path: "blog",
        element: <BlogTable />,
      },
      {
        path: "category",
        element: <CategoryTable />,
      },
      {
        path: "bloodrequests",
        element: <BloodRequests />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "blood-inventory",
        element: <BloodInventoryTable />,
      },
      {
        path: "donationevent",
        element: <EventTable />,
      },
    ],
  },
]);
