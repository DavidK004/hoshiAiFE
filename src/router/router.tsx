import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import IndexPage from "../pages/IndexPage/IndexPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/Profilepage";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import ActivateAccountPage from "../pages/ActivateAccountPage/ActivateAccountPage";

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
    ],
  },
]);

export default router;
