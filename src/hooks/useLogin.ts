import { useMutation } from "@tanstack/react-query";
import type {
  LoginPayload,
  LoginResponse,
} from "../components/shared/types/AuthTypes";
import { loginRequest } from "../api/authApi";

export const useLogin = () =>
  useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: loginRequest,
  });
