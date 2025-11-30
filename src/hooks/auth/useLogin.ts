import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "../../api/authApi";
import { toast } from "react-toastify";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      queryClient.setQueryData(["me"], data.user);
      toast.success(`Welcome ${data.user.username}`);
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Login failed");
    },
  });
};
