import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useUserById } from "../../hooks/users/useUserById";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";

const UserForm = () => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user");

  const { data: user, isLoading: isLoadingUser } = useUserById(
    id ? Number(id) : undefined
  );

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setType(user.type);
    }
  }, [user]);

  if (isUpdate && isLoadingUser) return <CircularProgress />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { username, email, type, ...(password && { password }) };

    if (isUpdate && id) {
      updateUserMutation.mutate(
        { id: Number(id), payload },
        { onSuccess: () => navigate("/dashboard/users") }
      );
    } else {
      createUserMutation.mutate(payload, {
        onSuccess: () => navigate("/dashboard/users"),
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={3}>
        {isUpdate ? "Update User" : "Create User"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          placeholder={isUpdate ? "Leave blank to keep current password" : ""}
          required={!isUpdate}
        />
        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="creator">Creator</MenuItem>
          <MenuItem value="banned">Banned</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          {isUpdate ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
