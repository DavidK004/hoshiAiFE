import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLogin } from "../hooks/useLogin";
import type { LoginPayload, User } from "../components/shared/types/AuthTypes";
import { createContext, useContext, type ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useCurrentUser();
  const loginMutation = useLogin();

  const login = async (payload: LoginPayload) => {
    await loginMutation.mutateAsync(payload, {
      onSuccess: (data) => {
        localStorage.setItem("access_token", data.access_token);
        queryClient.setQueryData(["me"], data.user);
        toast.success(`Welcome ${data.user.username}`);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Login failed");
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    queryClient.removeQueries({ queryKey: ["me"] });
    toast.info("Logged out");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
