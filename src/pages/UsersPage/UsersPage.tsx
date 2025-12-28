import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useUsers } from "../../hooks/users/useUsers";
import { useDeleteUser } from "../../hooks/users/useDeleteUser";
import Container from "../../components/shared/Container";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const { data, isLoading, isError } = useUsers(currentPage);
  const deleteMutation = useDeleteUser();
  const navigate = useNavigate();

  const handleCreateUser = () => {
     navigate(`/dashboard/users/create`);
  };

  const handleUpdateUser = (id: number) => {
    navigate(`/dashboard/users/${id}/update`);
  };

  const handleDeleteUser = () => {
    if (deleteUserId !== null) {
      deleteMutation.mutate(deleteUserId, {
        onSuccess: () => setDeleteUserId(null),
      });
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading users.</Typography>;

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="primary" onClick={handleCreateUser}>
          Create User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdateUser(user.id)}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => setDeleteUserId(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        color="primary"
        shape="rounded"
        count={data?.meta.last_page}
        page={currentPage}
        onChange={(_, value) => setCurrentPage(value)}
        sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center" }}
      />

      <Dialog
        open={deleteUserId !== null}
        onClose={() => setDeleteUserId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUserId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={handleDeleteUser}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UsersPage;
