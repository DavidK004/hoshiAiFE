import { useMutation } from "@tanstack/react-query";
import { registrationRequest } from "../api/authApi";
import type { RegistrationPayload } from "../components/shared/types/AuthTypes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useRegistration = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({
      username,
      email,
      password,
      password_confirmation,
    }: RegistrationPayload) =>
      registrationRequest({ username, email, password, password_confirmation }),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};
