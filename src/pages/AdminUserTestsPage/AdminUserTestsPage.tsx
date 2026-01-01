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

import Container from "../../components/shared/Container";
import { useGetAllUserTests } from "../../hooks/tests/useGetAllUserTests";
import { useDeleteUserTest } from "../../hooks/tests/useDeteleUserTest";

import UserTestRow from "../../components/UserTestRow/UserTestRow";

const UserTestsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading, isError } = useGetAllUserTests(currentPage);
  const deleteMutation = useDeleteUserTest();

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading user tests.</Typography>;

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">User Tests</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Test Taker</TableCell>
              <TableCell>Test Author</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Closed At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.data.map((ut) => (
              <UserTestRow
                key={ut.id}
                userTest={ut}
                onDelete={(id) => setDeleteId(id)}
              />
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
        sx={{
          mt: 3,
          mb: 3,
          display: "flex",
          justifyContent: "center",
        }}
      />

      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user test?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserTestsPage;
