import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../api/authApi";
import { toast } from "react-toastify";

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => requestPasswordReset(email),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message);
    },
  });
};
