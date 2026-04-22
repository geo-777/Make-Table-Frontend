import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Login from "../../features/auth/pages/Login";
import LandingPage from "../../pages/landingPage/LandingPage";
import DashboardOveriew from "../../features/dashboard/pages/DashboardOveriew";
import DashboardSelected from "../../features/dashboard/pages/DashboardSelected";
import Register from "../../features/auth/pages/Register";
import Classes from "../../features/classes/pages/Classes";
import Subjects from "../../features/subjects/pages/Subjects";
import Teachers from "../../features/teachers/pages/Teachers";
import Settings from "../../features/settings/Settings";
import HelpSupport from "../../pages/help&support/HelpSupport";
import useTimeTableSelect from "../../shared/zustand/timetableSelectStore";
const AppRoutes = () => {
  const { selectedTimetableData } = useTimeTableSelect();

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
      <Route
        path="/register"
        element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        }
      />

      {/* Private routes*/}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            {selectedTimetableData ? (
              <DashboardSelected />
            ) : (
              <DashboardOveriew />
            )}
          </ProtectedRoutes>
        }
      />

      <Route
        path="/classes"
        element={
          <ProtectedRoutes>
            <Classes />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/subjects"
        element={
          <ProtectedRoutes>
            <Subjects />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/teachers"
        element={
          <ProtectedRoutes>
            <Teachers />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoutes>
            <Settings />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/helpsupport"
        element={
          <ProtectedRoutes>
            <HelpSupport />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
