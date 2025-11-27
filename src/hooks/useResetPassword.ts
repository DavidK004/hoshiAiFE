import { useMutation } from "@tanstack/react-query";
import type { ResetPasswordPayload } from "../components/shared/types/AuthTypes";
import { resetPassword } from "../api/authApi";
import { toast } from "react-toastify";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => resetPassword(data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
