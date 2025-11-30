import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/authApi";
import { toast } from "react-toastify";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
