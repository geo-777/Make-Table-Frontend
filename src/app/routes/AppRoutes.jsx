import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

import Navbar from "../../shared/components/navbar/Navbar";
import LoaderFull from "../../shared/components/loader/LoaderFull";

const Login              = lazy(() => import("../../features/auth/pages/Login"));
const Register           = lazy(() => import("../../features/auth/pages/Register"));

const Settings           = lazy(() => import("../../features/settings/Settings"));
const Classes            = lazy(() => import("../../features/classes/pages/Classes"));
const Subjects           = lazy(() => import("../../features/subjects/pages/Subjects"));
const Teachers           = lazy(() => import("../../features/teachers/pages/Teachers"));
const DashboardOverview  = lazy(() => import("../../features/dashboard/pages/DashboardOveriew"));

const Error404           = lazy(() => import("../../pages/error/Error404"));
const LandingPage        = lazy(() => import("../../pages/landingPage/LandingPage"));
const HelpSupport        = lazy(() => import("../../pages/help&support/HelpSupport"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoaderFull />}>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/"         element={<PublicRoutes> <LandingPage /> </PublicRoutes>} />
        <Route path="/login"    element={<PublicRoutes> <Login />       </PublicRoutes>} />
        <Route path="/register" element={<PublicRoutes> <Register />    </PublicRoutes>} />

        {/* --- Protected Routes --- */}
        <Route element={<Navbar />}>
          <Route path="/dashboard"   element={<ProtectedRoutes> <DashboardOverview /> </ProtectedRoutes>} />
          <Route path="/classes"     element={<ProtectedRoutes> <Classes />           </ProtectedRoutes>} />
          <Route path="/subjects"    element={<ProtectedRoutes> <Subjects />          </ProtectedRoutes>} />
          <Route path="/teachers"    element={<ProtectedRoutes> <Teachers />          </ProtectedRoutes>} />
          <Route path="/settings"    element={<ProtectedRoutes> <Settings />          </ProtectedRoutes>} />
          <Route path="/helpsupport" element={<ProtectedRoutes> <HelpSupport />       </ProtectedRoutes>} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}