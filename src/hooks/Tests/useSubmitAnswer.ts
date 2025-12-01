import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitAnswer } from "../../api/testApi";
import { toast } from "react-toastify";

export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitAnswer,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["current-test"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
