import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import Container from "../shared/Container";
import Forbidden from "../../pages/Unauthorized/Forbidden";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const AdminProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Container>Loading...</Container>;

  if (user?.type === "user" || user?.type === "banned") return <Forbidden />;

  return <>{children}</>;
};
