import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuestion, type QuestionPayload } from "../../api/questionsApi";
import { toast } from "react-toastify";

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: QuestionPayload }) =>
      updateQuestion(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question Updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
