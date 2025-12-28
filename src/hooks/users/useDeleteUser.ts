import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../api/usersApi";
import { toast } from "react-toastify";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Deleted!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
