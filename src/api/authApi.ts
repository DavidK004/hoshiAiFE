import {
  type RegistrationResponse,
  type LoginPayload,
  type LoginResponse,
  type MeResponse,
  type RegistrationPayload,
  type User,
} from "../components/shared/types/AuthTypes";
import axiosInstance from "./axiosInstance";

export const loginRequest = async (data: LoginPayload) => {
  const res = await axiosInstance.post<LoginResponse>("/api/auth/login", data);
  return res.data;
};

export const fetchMe = async (): Promise<User> => {
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
