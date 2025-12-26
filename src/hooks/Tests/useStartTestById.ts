import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startTestById } from "../../api/testApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useStartTestById = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id: number) => startTestById(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-tests"] });
      toast.success("Test Started");
      navigate(`/tests/${data.id}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};