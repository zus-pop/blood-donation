import DashboardProtectedRoute from "@/DashboardProtectedRoute";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import AuthRequiredRoute from "./AuthRequiredRoute";
import ClientProtectedRoute from "./ClientProtectedRoute";
import GlobalModal from "./components/GlobalModal";
import ScrollToTop from "./components/scroll-to-top";

const Login = lazy(() => import("./pages/dashboard/Login"));
const Header = lazy(() => import("./components/header"));
const BlogTable = lazy(() => import("./pages/dashboard/blog/blog-table"));
const CategoryTable = lazy(
  () => import("./pages/dashboard/category/category-table")
);
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const DashboardIndexWrapper = lazy(() => import("./pages/dashboard/DashboardIndexWrapper"));
const Home = lazy(() => import("./pages/clients/Home"));
const BloodRequestsManage = lazy(
  () => import("./pages/dashboard/bloodrequest/index")
);
const UserPage = lazy(() => import("./pages/dashboard/user"));
const BloodRequests = lazy(
  () => import("./pages/clients/bloodrequest/BloodRequest")
);
const BloodInventoryTable = lazy(
  () => import("./pages/dashboard/blood-inventory/blood-inventory-table")
);
const EventTable = lazy(
  () => import("./pages/dashboard/donationevent/event-table")
);
const BlogSection = lazy(() => import("./pages/clients/blogs/BlogSection"));
const BlogDetail = lazy(() => import("./pages/clients/blogs/BlogDetail"));
const BloodInfoSection = lazy(
  () => import("./pages/clients/bloodinfo/BloodInfoSection")
);
const BloodRequestSection = lazy(
  () => import("./pages/clients/bloodrequest/BloodRequestSection")
);
const DonationEvents = lazy(() => import("./pages/clients/DonationEvents"));
const ParticipationTable = lazy(
  () => import("./pages/dashboard/participation/participation-table")
);
const OnsiteCheckTable = lazy(
  () => import("./pages/dashboard/onsitecheck/onsitecheck-table")
);
const MyEventPage = lazy(() => import("./pages/clients/MyEventPage"));

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

export default createBrowserRouter([
  {
    path: "/",
    element: (
      <ClientProtectedRoute>
        <ScrollToTop />
        <Header />
        <Outlet />
        <GlobalModal />
      </ClientProtectedRoute>
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
        element: (
          <AuthRequiredRoute>{withSuspense(BloodRequests)}</AuthRequiredRoute>
        ),
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
      },
      {
        path: "/my-events",
        element: withSuspense(MyEventPage),
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/dashboard",
    element: (
      <DashboardProtectedRoute>
        <>
          <ScrollToTop />
          <Dashboard />
        </>
      </DashboardProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(DashboardIndexWrapper),
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
      {
        path: "participation",
        element: withSuspense(ParticipationTable),
      },
      {
        path: "onsitecheck",
        element: withSuspense(OnsiteCheckTable),
      },
    ],
  },
]);
