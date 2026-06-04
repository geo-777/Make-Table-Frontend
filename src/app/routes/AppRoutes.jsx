import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Navbar from "../../shared/components/navbar/Navbar";
import LoaderFull from "../../shared/components/loader/LoaderFull";

const MyProfile = lazy(() => import("../../pages/myprofile/MyProfile"));
const Login = lazy(() => import("../../features/auth/pages/Login"));
const Register = lazy(() => import("../../features/auth/pages/Register"));

const Settings = lazy(() => import("../../features/settings/pages/Settings"));
const Classes = lazy(() => import("../../features/classes/pages/Classes"));
const Subjects = lazy(() => import("../../features/subjects/pages/Subjects"));
const Teachers = lazy(() => import("../../features/teachers/pages/Teachers"));
const DashboardOverview = lazy(
  () => import("../../features/dashboard/pages/DashboardOveriew"),
);
const Assignments = lazy(
  () => import("../../features/assignments/pages/Assignments"),
);

const Error404 = lazy(() => import("../../pages/error/Error404"));
const LandingPage = lazy(() => import("../../pages/landingPage/LandingPage"));
const HelpSupport = lazy(() => import("../../pages/help&support/HelpSupport"));
const Documentation = lazy(
  () => import("../../pages/documentation/Documentation"),
);
const PublicTimetables = lazy(
  () => import("../../features/publicTimetables/pages/PublicTimetables"),
);

const TermsAndConditions = lazy(
  () => import("../../pages/legal/TermsAndConditions"),
);
const PrivacyPolicy = lazy(() => import("../../pages/legal/PrivacyPolicy"));
export default function AppRoutes() {
  return (
    <Suspense fallback={<LoaderFull />}>
      <Routes>
        {/* --- Public Routes --- */}
        <Route
          path="/"
          element={
            <PublicRoutes>
              {" "}
              <LandingPage />{" "}
            </PublicRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              {" "}
              <Login />{" "}
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              {" "}
              <Register />{" "}
            </PublicRoutes>
          }
        />
        <Route path={"/docs"} element={<Documentation />} />
        <Route path={"/documentation"} element={<Documentation />} />
        <Route
          path={"/timetable/class/:id"}
          element={<PublicTimetables classTable={true} />}
        />
        <Route
          path="/timetable/teacher/:id"
          element={<PublicTimetables classTable={false} />}
        />
        <Route path="/toc" element={<TermsAndConditions />} />

        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* --- Protected Routes --- */}
        <Route element={<Navbar />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                {" "}
                <DashboardOverview />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/classes"
            element={
              <ProtectedRoutes>
                {" "}
                <Classes />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/subjects"
            element={
              <ProtectedRoutes>
                {" "}
                <Subjects />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/teachers"
            element={
              <ProtectedRoutes>
                {" "}
                <Teachers />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/assignments"
            element={
              <ProtectedRoutes>
                {" "}
                <Assignments />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoutes>
                {" "}
                <Settings />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/helpsupport"
            element={
              <ProtectedRoutes>
                {" "}
                <HelpSupport />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/myprofile"
            element={
              <ProtectedRoutes>
                {" "}
                <MyProfile />{" "}
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
