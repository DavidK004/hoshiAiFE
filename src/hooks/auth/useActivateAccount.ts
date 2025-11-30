import { useMutation } from "@tanstack/react-query";
import { activateAccount } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useActivateAccount = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: activateAccount,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Activation failed");
    },
  });
};

