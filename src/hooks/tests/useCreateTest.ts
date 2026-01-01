import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTest } from "../../api/testApi";
import { toast } from "react-toastify";

export const useCreateTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      toast.success("Test Created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
