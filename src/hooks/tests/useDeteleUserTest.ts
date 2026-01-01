import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserTest } from "../../api/testApi";
import { toast } from "react-toastify";

export const useDeleteUserTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUserTest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-user-tests"] });
      toast.success("User Test deleted")
    },
  });
};
