import { Box, Button, TextField, Typography } from "@mui/material";
import Container from "../../components/shared/Container";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useRequestPasswordReset } from "../../hooks/auth/useRequestPasswordReset";

const RequestResetPage = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const requestPasswordReset = useRequestPasswordReset();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    requestPasswordReset.mutate(email, {
      onSuccess: () => {
        setEmail("");
      },
    });
  };

  return (
    <Container>
      <Box sx={{ padding: 4, maxWidth: 360, margin: "auto" }}>
        <Typography variant="h4" mb={3} textAlign="center">
          Request Password Reset
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: "10px" }}
          >
            Send
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RequestResetPage;
