import type { User } from "../components/shared/types/AuthTypes";
import axiosInstance from "./axiosInstance";

export type UsersResponse = {
  data: User[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export interface UserPayload {
  username: string;
  email: string;
  password?: string;
  type: string;
}

export const getUsers = async (page = 1) => {
  const res = await axiosInstance.get<UsersResponse>("/api/users", {
    params: { page },
  });
  return res.data;
};

export const getUserById = async (id: number) => {
  const res = await axiosInstance.get(`/api/users/${id}`);
  return res.data.data;
};

export const deleteUser = async (id: number) => {
  const res = await axiosInstance.delete(`/api/users/${id}`);
  return res.data;
};

export const createUser = async (payload: UserPayload) => {
  const res = await axiosInstance.post<User>("/api/users", payload);
  return res.data;
};

export const updateUser = async (id: number, payload: UserPayload) => {
  const res = await axiosInstance.put<User>(`/api/users/${id}`, {
    username: payload.username,
    email: payload.email,
    password: payload.password,
    type: payload.type,
  });
  return res.data;
};
