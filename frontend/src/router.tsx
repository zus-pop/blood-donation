import { createBrowserRouter, Outlet } from "react-router";
import WelcomeDashBoard from "./components/welcome-dashboard";
import BlogTable from "./pages/dashboard/blog/blog-table";
import CategoryTable from "./pages/dashboard/category/category-table";
import Dashboard from "./pages/dashboard/Dashboard";
import BloodInventoryTable from "./pages/dashboard/blood-inventory/blood-inventory-table";
import Home from "./pages/Home";
import BloodRequests from "./pages/dashboard/bloodrequest/index";
import UserPage from "./pages/dashboard/user";
import EventTable from "./pages/dashboard/donationevent/event-table";
import BlogSection from "./pages/BlogSection";
import Header from "./components/header";
import BlogDetail from "./pages/BlogDetail";
import ScrollToTop from "./components/scroll-to-top";
import { Toaster } from "./components/ui/sonner";

export default createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/blogs",
        Component: BlogSection,
      },
      {
        path: "/blogs/:id",
        Component: BlogDetail,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <>
        <ScrollToTop />
        <Dashboard />
        <Toaster richColors theme="system" />
      </>
    ),
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
