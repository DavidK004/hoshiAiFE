import { Box, Typography } from "@mui/material";

export default function Forbidden() {
  return (
   <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="80vh"
    >
      <Typography variant="h2" color="error" mb={2}>
        403
      </Typography>
      <Typography variant="h5">Forbidden</Typography>
      <Typography>You do not have access to this page.</Typography>
    </Box>
  );
}
