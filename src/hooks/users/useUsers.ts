import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/usersApi";

export const useUsers = (page = 1) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    staleTime: 1000 * 60,
  });
};
