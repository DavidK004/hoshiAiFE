import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLogin } from "../hooks/useLogin";
import type {
  LoginPayload,
  LoginResponse,
  User,
} from "../components/shared/types/AuthTypes";
import { createContext, useContext } from "react";
import type { OnlyChildrenProps } from "../components/shared/types/OnlyChildrenProps";

interface AuthContextType {
  user: User | null;
  login: (data: LoginPayload) => Promise<LoginResponse>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: OnlyChildrenProps) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useCurrentUser();
  const loginMutation = useLogin();

  const logout = () => {
    localStorage.removeItem("access_token");
    queryClient.removeQueries({ queryKey: ["me"] });
    toast.info("Logged out");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        login: loginMutation.mutateAsync,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
