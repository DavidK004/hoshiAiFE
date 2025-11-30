import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import IndexPage from "../pages/IndexPage/IndexPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/Profilepage";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import ActivateAccountPage from "../pages/ActivateAccountPage/ActivateAccountPage";
import RequestResetPage from "../pages/RequestResetPage/RequestResetPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import SingleQuestionPage from "../pages/SingleQuestionPage/SingleQuestionPage";
import { TestPage } from "../pages/TestPage/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/auth/email-activation/:token",
        element: <ActivateAccountPage />,
      },
      {
        path: "/reset-password",
        element: <RequestResetPage />,
      },
      {
        path: "/auth/reset-password/:token",
        element: <ResetPasswordPage />,
      },
      {
        path: "/questions/:id",
        element: <SingleQuestionPage/>
      },
      {
        path: "/tests/:id",
        element: <TestPage/>
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
