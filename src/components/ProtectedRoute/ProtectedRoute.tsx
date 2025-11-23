import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import Unauthorized from "../../pages/Unauthorized/Unauthorized";
import Container from "../shared/Container";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Container>Loading...</Container>;

  if (!user) return <Unauthorized />;

  return <>{children}</>;
};
