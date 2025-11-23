import { Box, Typography } from "@mui/material";

export default function Unauthorized() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h2" color="error" mb={2}>
        401
      </Typography>
      <Typography variant="h5">Unauthorized</Typography>
      <Typography>You do not have access to this page.</Typography>
    </Box>
  );
}
