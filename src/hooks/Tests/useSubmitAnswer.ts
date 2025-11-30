import { useMutation } from "@tanstack/react-query";
import { submitAnswer } from "../../api/testApi";
import { toast } from "react-toastify";

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: submitAnswer,
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
