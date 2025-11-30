import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
  const res = await axiosInstance.get("/api/categories");
  return res.data.data;
};
