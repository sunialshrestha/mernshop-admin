import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);
  return currentUser?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
