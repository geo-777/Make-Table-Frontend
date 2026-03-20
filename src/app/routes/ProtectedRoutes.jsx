import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import LoaderFull from "../../shared/components/loader/LoaderFull";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoaderFull></LoaderFull>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
