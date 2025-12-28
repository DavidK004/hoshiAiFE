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
import TestsPage from "../pages/TestsPage/TestsPage";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Container from "../components/shared/Container";
import UsersPage from "../pages/UsersPage/UsersPage";
import UserForm from "../pages/UserForm/UserForm";

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
        element: <SingleQuestionPage />,
      },
      {
        path: "/tests/:id",
        element: (
          <ProtectedRoute>
            <TestPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tests",
        element: <TestsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      {
        path: "users",
        children: [
          { index: true, element: <UsersPage /> },
          { path: "create", element: <UserForm /> },
          { path: ":id/update", element: <UserForm /> },
        ],
      },
      { path: "questions", element: <Container>questions</Container> },
      { path: "tests", element: <Container>tests</Container> },
      { path: "user-tests", element: <Container>User Tests</Container> },
      { path: "categories", element: <Container>categories</Container> },
      { path: "logs", element: <Container>logs</Container> },
    ],
  },
]);

export default router;
