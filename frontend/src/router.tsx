import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

const WelcomeDashBoard = lazy(() => import("./components/welcome-dashboard"));
const BlogTable = lazy(() => import("./pages/dashboard/blog/blog-table"));
const CategoryTable = lazy(() => import("./pages/dashboard/category/category-table"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Home = lazy(() => import("./pages/clients/Home"));
const BloodRequests = lazy(() => import("./pages/dashboard/bloodrequest/index"));
const UserPage = lazy(() => import("./pages/dashboard/user"));

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
        element: withSuspense(BloodRequests),
      },
      {
        path: "users",
        element: withSuspense(UserPage),
      }
    ],
  },
]);
