import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useActivateAccount } from "../../hooks/auth/useActivateAccount";
import { CircularProgress, Box, Typography } from "@mui/material";

const ActivateAccountPage = () => {
  const { token } = useParams<{ token: string }>();
  const activateMutation = useActivateAccount();

  useEffect(() => {
    if (!token) return;
    activateMutation.mutate(token);
  }, []);

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      {activateMutation.isPending ? (
        <CircularProgress />
      ) : (
        <Typography variant="h5">Activating your account...</Typography>
      )}
    </Box>
  );
};

export default ActivateAccountPage;
