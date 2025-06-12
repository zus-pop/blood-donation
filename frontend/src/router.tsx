import { createBrowserRouter } from "react-router";

import { lazy, Suspense } from "react";

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
    element: withSuspense(Home),
  },
  {
    path: "/bloodrequest",
    element: withSuspense(BloodRequests),
  },
  {
    path: "/dashboard",
    element: withSuspense(Dashboard),
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

    ]
  }
]);
