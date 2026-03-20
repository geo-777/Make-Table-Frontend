import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import LoaderFull from "../../shared/components/loader/LoaderFull";

const PublicRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoaderFull></LoaderFull>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoutes;
