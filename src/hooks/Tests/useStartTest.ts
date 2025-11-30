import { useMutation } from "@tanstack/react-query";
import { startTest } from "../../api/testApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useStartTest = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: startTest,
    onSuccess: (data) => {
      toast.success("Test Started");
      navigate(`/tests/${data.id}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
