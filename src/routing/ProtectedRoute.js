import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";
import cookieManager from "../utils/cookieManager";
import cookieKeys from "../constants/cookieKeys";
const ProtectedRoute = ({ roles }) => {
  const user = cookieManager.get(cookieKeys.USER)

  if (!user) {
    console.log(user)
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
