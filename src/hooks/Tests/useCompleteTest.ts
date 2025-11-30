import { useMutation } from "@tanstack/react-query";
import { completeUserTest } from "../../api/testApi";
import { toast } from "react-toastify";

export const useCompleteTest = () => {
  return useMutation({
    mutationFn:  completeUserTest,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
