import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = localStorage.getItem("access_token");
  return token ? element : <Navigate to="/login" />;
};
