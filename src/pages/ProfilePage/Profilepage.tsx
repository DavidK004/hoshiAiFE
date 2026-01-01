import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/shared/Container";
import { useNavigate } from "react-router-dom";
import { useGetUserTests } from "../../hooks/tests/useGetUserTests";
import TestCard from "../../components/TestCard/TestCard";
import { useState } from "react";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data: tests, isLoading, error } = useGetUserTests();

  const [tabIndex, setTabIndex] = useState(0);

  const activeTests = tests?.filter((t) => t.is_available && !t.is_completed);
  const completedTests = tests?.filter((t) => t.is_completed);
  const expiredTests = tests?.filter((t) => !t.is_available && !t.is_completed);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

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
            sx={{ marginLeft: "10px" }}
            variant="contained"
            color="secondary"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </Button>
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" mb={2}>
          Your Tests
        </Typography>

        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label={`Active (${activeTests?.length || 0})`} />
          <Tab label={`Completed (${completedTests?.length || 0})`} />
          <Tab label={`Expired (${expiredTests?.length || 0})`} />
        </Tabs>

        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {isLoading && <Typography>Loading tests...</Typography>}
          {error && (
            <Typography color="error">Failed to load tests.</Typography>
          )}

          {tabIndex === 0 &&
            (activeTests?.length ? (
              activeTests.map((t) => <TestCard key={t.id} test={t} />)
            ) : (
              <Typography>No active tests</Typography>
            ))}
          {tabIndex === 1 &&
            (completedTests?.length ? (
              completedTests.map((t) => <TestCard key={t.id} test={t} />)
            ) : (
              <Typography>No completed tests</Typography>
            ))}
          {tabIndex === 2 &&
            (expiredTests?.length ? (
              expiredTests.map((t) => <TestCard key={t.id} test={t} />)
            ) : (
              <Typography>No expired tests</Typography>
            ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
