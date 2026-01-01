import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion } from "../../api/questionsApi";
import { toast } from "react-toastify";

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question Deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
