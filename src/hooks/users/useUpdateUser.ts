import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, type UserPayload } from "../../api/usersApi";
import { toast } from "react-toastify";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UserPayload }) =>
      updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Updated");
    },
    onError: (error) =>{
      toast.error(error.message);
    }
  });
};
