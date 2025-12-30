import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../api/categoryApi";
import { toast } from "react-toastify";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category Deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
