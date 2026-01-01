import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTest } from "../../api/testApi";
import { toast } from "react-toastify";

export const useDeleteTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      toast.success("Test deleted");
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to delete test");
    },
  });
};
