import { Box, Typography } from "@mui/material";
function NotFoundPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="80vh"
    >
      <Typography variant="h2" color="error" mb={2}>
        404
      </Typography>
      <Typography variant="h5" mb={1}>
        Page Not Found
      </Typography>
      <Typography>The page you are looking for does not exist.</Typography>
    </Box>
  );
}

export default NotFoundPage;
