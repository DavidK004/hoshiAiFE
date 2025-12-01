import { useQuery } from "@tanstack/react-query";
import { getUserTests } from "../../api/testApi";

export const useGetUserTests = () => {
  return useQuery({
    queryKey: ["user-tests"],
    queryFn: () => getUserTests(),
  });
};
