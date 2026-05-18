import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Navbar from "../../shared/components/navbar/Navbar";

// Placeholder
const PageLoader = () => ( <div> Loading... </div> );

const Login              = lazy(() => import("../../features/auth/pages/Login"));
const LandingPage        = lazy(() => import("../../pages/landingPage/LandingPage"));
const DashboardOverview  = lazy(() => import("../../features/dashboard/pages/DashboardOveriew"));
const Register           = lazy(() => import("../../features/auth/pages/Register"));
const Classes            = lazy(() => import("../../features/classes/pages/Classes"));
const Subjects           = lazy(() => import("../../features/subjects/pages/Subjects"));
const Teachers           = lazy(() => import("../../features/teachers/pages/Teachers"));
const Settings           = lazy(() => import("../../features/settings/Settings"));
const HelpSupport        = lazy(() => import("../../pages/help&support/HelpSupport"));
const Error404           = lazy(() => import("../../pages/error/Error404"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/"         element={<PublicRoutes><LandingPage /></PublicRoutes>} />
        <Route path="/login"    element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />

        {/* --- Protected Routes --- */}
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<ProtectedRoutes><DashboardOverview /></ProtectedRoutes>} />
          <Route path="/classes"     element={<ProtectedRoutes><Classes /></ProtectedRoutes>} />
          <Route path="/subjects"    element={<ProtectedRoutes><Subjects /></ProtectedRoutes>} />
          <Route path="/teachers"    element={<ProtectedRoutes><Teachers /></ProtectedRoutes>} />
          <Route path="/settings"    element={<ProtectedRoutes><Settings /></ProtectedRoutes>} />
          <Route path="/helpsupport" element={<ProtectedRoutes><HelpSupport /></ProtectedRoutes>} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}