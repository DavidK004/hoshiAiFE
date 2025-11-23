import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
  User,
} from "../components/shared/types/AuthTypes";
import axiosInstance from "./axiosInstance";

export const loginRequest = async (
  data: LoginPayload
): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>("/api/auth/login", data);
  return res.data;
};

export const fetchMe = async (): Promise<User> => {
  const res = await axiosInstance.get<MeResponse>("/api/auth/me");
  return res.data.user;
};
