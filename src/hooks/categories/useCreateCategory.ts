import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../api/categoryApi";
import { toast } from "react-toastify";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category Created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
