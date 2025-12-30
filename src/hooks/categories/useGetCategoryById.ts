import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../../api/categoryApi";

export const useCategoryById = (id?: number) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id!),
    enabled: !!id,
  });
};