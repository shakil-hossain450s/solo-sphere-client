import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import JobDetails from "../pages/JobDetails";
import ErrorPage from "../pages/ErrorPage";
import AddJob from "../pages/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs";
import UpdateJob from "../pages/UpdateJob";
import PrivateRoutes from "./PrivateRoutes";
import MyBids from "../pages/MyBids";
import BidRequests from "../pages/BidRequests";
import AllJobs from "../pages/AllJobs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home
      },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      {
        path: "/job/:id",
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`),
        element: <PrivateRoutes>
          <JobDetails />
        </PrivateRoutes>
      },
      {
        path: "/add-job",
        element: <PrivateRoutes>
          <AddJob />
        </PrivateRoutes>
      },
      {
        path: "/my-posted-jobs",
        element: <PrivateRoutes>
          <MyPostedJobs />
        </PrivateRoutes>
      },
      {
        path: "/update-job/:id",
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`),
        element: <PrivateRoutes>
          <UpdateJob />
        </PrivateRoutes>
      },
      {
        path: "/my-bids",
        element: <PrivateRoutes>
          <MyBids />
        </PrivateRoutes>
      },
      {
        path: "/bid-requests",
        element: <PrivateRoutes>
          <BidRequests />
        </PrivateRoutes>
      },
      {
        path: "/all-jobs",
        element: <AllJobs />
      }
    ]
  }
]);

export default router;