import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeUserTest } from "../../api/testApi";
import { toast } from "react-toastify";

export const useCompleteTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeUserTest,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["current-test"] });
      queryClient.invalidateQueries({ queryKey: ["user-tests"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
