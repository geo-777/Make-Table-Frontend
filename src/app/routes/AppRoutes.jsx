import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Login from "../../features/auth/pages/Login";
import LandingPage from "../../pages/LandingPage";
import Dashboard from "../../features/dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/*Public Routes*/}
      <Route
        path="/"
        element={
          <PublicRoutes>
            <LandingPage />
          </PublicRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
      />

      {/* Private routes*/}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
