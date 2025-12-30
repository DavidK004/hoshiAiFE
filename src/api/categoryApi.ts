import type { CategoryType } from "../components/shared/types/TestTypes";
import axiosInstance from "./axiosInstance";

interface CategoriesResponse {
  data: CategoryType[];
}

export const getCategories = async () => {
  const res = await axiosInstance.get<CategoriesResponse>("/api/categories");
  return res.data.data;
};

export const getCategoryById = async (id: number) => {
  const res = await axiosInstance.get<{data:CategoryType}>(`/api/categories/${id}`);
  return res.data.data;
};

export const createCategory = async (name: string) => {
  const res = await axiosInstance.post(`/api/categories`, { name });
  return res.data;
};

export const updateCategory = async (id: number, name: string) => {
  const res = await axiosInstance.put(`/api/categories/${id}`, { name });
  return res.data;
};

export const deleteCategory = async (id: number) => {
  const res = await axiosInstance.delete(`/api/categories/${id}`);
  return res.data;
};

