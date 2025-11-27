import {
  type RegistrationResponse,
  type LoginPayload,
  type LoginResponse,
  type MeResponse,
  type RegistrationPayload,
  type ResetPasswordPayload,
} from "../components/shared/types/AuthTypes";
import axiosInstance from "./axiosInstance";

export const loginRequest = async (data: LoginPayload) => {
  const res = await axiosInstance.post<LoginResponse>("/api/auth/login", data);
  return res.data;
};

export const fetchMe = async () => {
  const res = await axiosInstance.get<MeResponse>("/api/auth/me");
  return res.data.user;
};

export const registrationRequest = async (data: RegistrationPayload) => {
  const res = await axiosInstance.post<RegistrationResponse>(
    "/api/auth/register",
    data
  );
  return res.data;
};

export const activateAccount = async (token: string) => {
  const res = await axiosInstance.post<{ message: string }>(
    "/api/auth/activate-account",
    { token }
  );
  return res.data;
};

export const requestPasswordReset = async (email: string) => {
  const res = await axiosInstance.post<{ message: string }>(
    "/api/auth/forgot-password",
    { email }
  );
  return res.data;
};

export const resetPassword = async (data: ResetPasswordPayload) => {
  const res = await axiosInstance.post<{ message: string }>(
    "/api/auth/reset-password",
    data
  );
  return res.data;
};
