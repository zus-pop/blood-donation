import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import ScrollToTop from "./components/scroll-to-top";
import { Toaster } from "./components/ui/sonner";
import GlobalModal from "./components/GlobalModal";
import ProtectedRoute from "@/ProtectedRoute";

const Login = lazy(() => import("./pages/dashboard/Login"));
const Header = lazy(() => import("./components/header"));
const WelcomeDashBoard = lazy(() => import("./components/welcome-dashboard"));
const BlogTable = lazy(() => import("./pages/dashboard/blog/blog-table"));
const CategoryTable = lazy(() => import("./pages/dashboard/category/category-table"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Home = lazy(() => import("./pages/clients/Home"));
const BloodRequestsManage = lazy(() => import("./pages/dashboard/bloodrequest/index"));
const UserPage = lazy(() => import("./pages/dashboard/user"));
const BloodRequests = lazy(() => import("./pages/clients/bloodrequest/BloodRequest"));
const BloodInventoryTable = lazy(() => import("./pages/dashboard/blood-inventory/blood-inventory-table"))
const EventTable = lazy(() => import("./pages/dashboard/donationevent/event-table"))
const BlogSection = lazy(() => import("./pages/clients/blogs/BlogSection"));
const BlogDetail = lazy(() => import("./pages/clients/blogs/BlogDetail"));
const BloodInfoSection = lazy(() => import("./pages/clients/bloodinfo/BloodInfoSection"));
const BloodRequestSection = lazy(() => import("./pages/clients/bloodrequest/BloodRequestSection"));
const DonationEvents = lazy(() => import("./pages/clients/DonationEvents"));
function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense >
      <Component />
    </Suspense>
  );
}

export default createBrowserRouter([
  {
    path: "/",
    element: (
      <>

        <ScrollToTop />
        <Header />
        <Outlet />
        <GlobalModal />
        <Toaster richColors theme="system" />
      </>
    ),
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: "/blogs",
        element: withSuspense(BlogSection),
      },
      {
        path: "/blogs/:id",
        element: withSuspense(BlogDetail),
      },
      {
        path: "/bloodrequest",
        element: withSuspense(BloodRequests),
      },
      {
        path: "/blood-infos",
        element: withSuspense(BloodInfoSection),
      },
      {
        path: "/blrqsection",
        element: withSuspense(BloodRequestSection),
      },
      {
        path: "/donationevents",
        element: withSuspense(DonationEvents),
      }
    ],
  },
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <>
          <ScrollToTop />
          <Dashboard />
          <Toaster richColors theme="system" />
        </>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(WelcomeDashBoard),
      },
      {
        path: "blog",
        element: withSuspense(BlogTable),
      },
      {
        path: "category",
        element: withSuspense(CategoryTable),
      },
      {
        path: "bloodrequests",
        element: withSuspense(BloodRequestsManage),
      },
      {
        path: "users",
        element: withSuspense(UserPage),
      },
      {
        path: "blood-inventory",
        element: withSuspense(BloodInventoryTable),
      },
      {
        path: "donationevent",
        element: withSuspense(EventTable),
      },

    ]
  }
]);
