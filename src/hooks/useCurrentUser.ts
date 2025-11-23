import { useQuery } from "@tanstack/react-query";
import type { User } from "../components/shared/types/AuthTypes";
import { fetchMe } from "../api/authApi";

export const useCurrentUser = () =>
  useQuery<User>({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!localStorage.getItem("access_token"),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
