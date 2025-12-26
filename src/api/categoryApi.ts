import type { CategoryType } from "../components/shared/types/TestTypes";
import axiosInstance from "./axiosInstance";

interface CategoriesResponse {
  data: CategoryType[];
}

export const getCategories = async () => {
  const res = await axiosInstance.get<CategoriesResponse>("/api/categories");
  return res.data.data;
};
