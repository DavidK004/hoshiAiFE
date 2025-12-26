import { useQuery } from "@tanstack/react-query";
import { getTestById } from "../../api/testApi";
import type { TestType } from "../../components/shared/types/TestTypes";

export const useGetTestById = (id: number) => {
  return useQuery<TestType>({
    queryKey: ["tests", id],
    queryFn: () => getTestById(id),
  });
};
