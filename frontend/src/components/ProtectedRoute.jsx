import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useSelector((store) => store.user);

  // If user already logged in → block login page
  if (user) {
    return <Navigate to="/feed" replace />;
  }

  // Else allow access (render nested route)
  return <Outlet />;
};

export default ProtectedRoute;
