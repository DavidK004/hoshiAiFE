import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, type UserPayload } from "../../api/usersApi";
import { toast } from "react-toastify";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UserPayload) => createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
