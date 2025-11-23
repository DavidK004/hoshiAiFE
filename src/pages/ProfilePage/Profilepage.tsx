import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/shared/Container";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ padding: 4, maxWidth: 360 }}>
        <Typography variant="h4" mb={2}>
          Profile
        </Typography>
        <Typography variant="body1" mb={2}>
          Username: {user?.username}
        </Typography>
        <Typography variant="body1" mb={2}>
          E-mail: {user?.email}
        </Typography>
        <Typography variant="body1" mb={2}>
          Role: {user?.type}
        </Typography>
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
        {user?.type === "admin" && (
          <Button
          sx={{marginLeft: "10px"}}
            variant="contained"
            color="secondary"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
