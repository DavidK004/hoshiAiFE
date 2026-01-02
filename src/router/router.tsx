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
import UsersPage from "../pages/UsersPage/UsersPage";
import UserForm from "../pages/UserForm/UserForm";
import CategoriesPage from "../pages/CategoriesPage/CategoriesPage";
import CategoryForm from "../pages/CategoryForm/CategoryForm";
import LogsPage from "../pages/LogsPage/LogsPage";
import HitCountsPage from "../pages/HitcountsPage/HitcountsPage";
import UserTestsPage from "../pages/AdminUserTestsPage/AdminUserTestsPage";
import { SingleTestPage } from "../pages/SingleTestPage/SingleTestPage";
import AdminTestsPage from "../pages/AdminTestsPage/AdminTestsPage";
import TestForm from "../pages/TestForm/TestForm";
import QuestionsPage from "../pages/QuestionsPage/QuestionsPage";
import QuestionForm from "../pages/QuestionForm/QuestionForm";
import { AdminProtectedRoute } from "../components/ProtectedRoute/AdminProtectedRoute";

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
      { path: "/tests/view/:id", element: <SingleTestPage /> },

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
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { index: true, element: <QuestionsPage /> },
      {
        path: "users",
        children: [
          { index: true, element: <UsersPage /> },
          { path: "create", element: <UserForm /> },
          { path: ":id/update", element: <UserForm /> },
        ],
      },
      {
        path: "questions",
        children: [
          { index: true, element: <QuestionsPage /> },
          { path: "create", element: <QuestionForm /> },
          { path: ":id/update", element: <QuestionForm /> },
        ],
      },
      {
        path: "tests",
        children: [
          { index: true, element: <AdminTestsPage /> },
          { path: "create", element: <TestForm /> },
          { path: ":id/update", element: <TestForm /> },
        ],
      },
      { path: "user-tests", element: <UserTestsPage /> },
      {
        path: "categories",
        children: [
          { index: true, element: <CategoriesPage /> },
          { path: "create", element: <CategoryForm /> },
          { path: ":id/update", element: <CategoryForm /> },
        ],
      },
      { path: "logs", element: <LogsPage /> },
      { path: "hitcounts", element: <HitCountsPage /> },
    ],
  },
]);

export default router;
