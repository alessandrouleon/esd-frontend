import { Navigate, Outlet } from "react-router-dom";
import { UserToken } from "../services/localStorage";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/",
}) => {
  const userToken = UserToken.getLocalStorageToken();

  if (!userToken) {
    return <Navigate to={redirectPath} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
