import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../../api/authApi";
import { toast } from "react-toastify";

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message);
    },
  });
};
