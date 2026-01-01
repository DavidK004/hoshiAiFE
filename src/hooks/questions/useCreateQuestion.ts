import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion, type QuestionPayload } from "../../api/questionsApi";
import { toast } from "react-toastify";

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: QuestionPayload) => createQuestion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question Created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
