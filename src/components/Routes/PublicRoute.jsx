import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
export default function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
