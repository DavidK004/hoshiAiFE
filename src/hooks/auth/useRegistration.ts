import { useMutation } from "@tanstack/react-query";
import { registrationRequest } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useRegistration = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registrationRequest,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};
