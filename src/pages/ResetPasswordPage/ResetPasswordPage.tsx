import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useResetPassword } from "../../hooks/useResetPassword";
import Container from "../../components/shared/Container";
import { Box, Button, TextField, Typography } from "@mui/material";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { token } = useParams<{ token: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetMutation = useResetPassword();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) return;

    resetMutation.mutate(
      {
        token,
        password,
        password_confirmation: confirmPassword,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      }
    );
  };
  return (
    <Container>
      <Box sx={{ padding: 4, maxWidth: 360, margin: "auto" }}>
        <Typography variant="h4" mb={3} textAlign="center">
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={resetMutation.isPending}
          >
            {resetMutation.isPending ? "Sending..." : "Send"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
