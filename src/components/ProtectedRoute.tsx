import { Navigate, Outlet } from "react-router-dom";
import { User } from "../types/user";

interface ProtectedRouteProps {
  user: User;
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  redirectPath = "/login",
  children,
}) => {
  if (!user.token) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
