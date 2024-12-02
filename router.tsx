import { createBrowserRouter } from "react-router-dom";
import TaskPage from "./src/pages/TaskPage";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Layout from "./src/layouts/Layout";
import { ProtectedRoute } from "./src/components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/tasks",
        element: <ProtectedRoute element={<TaskPage />} />,
      },
    ],
  },
]);

export default router;
