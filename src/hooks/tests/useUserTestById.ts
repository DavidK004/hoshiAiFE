import { useQuery } from "@tanstack/react-query";
import { getUserTestById } from "../../api/testApi";

export const useUserTestById = (id: number) => {
  return useQuery({
    queryKey: ["current-test"],
    queryFn: () => getUserTestById(id),
  });
};
