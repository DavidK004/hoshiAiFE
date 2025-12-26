import { useQuery } from "@tanstack/react-query";
import { getTests } from "../../api/testApi";

type UseTestsParams = {
  page?: number;
  categoryId?: number;
};

export const useGetTests = ({ page = 1, categoryId }: UseTestsParams) => {
  return useQuery({
    queryKey: ["tests", { page, categoryId }],
    queryFn: () => getTests(categoryId, page),
    staleTime: 1000 * 60,
  });
};
