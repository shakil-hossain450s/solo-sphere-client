import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import JobDetails from "../pages/JobDetails";
import ErrorPage from "../pages/ErrorPage";
import AddJob from "../pages/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs";

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
        Component: JobDetails
      },
      {
        path: "/add-job",
        element: <AddJob />
      },
      {
        path: "/my-posted-jobs",
        element: <MyPostedJobs />
      }
    ]
  }
]);

export default router;