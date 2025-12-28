import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/usersApi";

export const useUserById = (id?: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id!),
    enabled: !!id,
  });
};
