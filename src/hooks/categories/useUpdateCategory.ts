import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../api/categoryApi";
import { toast } from "react-toastify";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category Updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
