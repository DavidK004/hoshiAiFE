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
import { useNavigate } from "react-router-dom";

import Container from "../../components/shared/Container";

import type { TestType } from "../../components/shared/types/TestTypes";
import { useGetTests } from "../../hooks/tests/useGetTests";
import { useDeleteTest } from "../../hooks/tests/useDeleteTest";
import { formatDate } from "../../utils/functions";
import { useAuth } from "../../context/AuthContext";

const AdminTestsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTestId, setDeleteTestId] = useState<number | null>(null);
  const { user } = useAuth();

  const { data, isLoading, isError } = useGetTests({ page: currentPage });
  const deleteMutation = useDeleteTest();
  const navigate = useNavigate();

  const handleViewTest = (id: number) => {
    navigate(`/tests/view/${id}`);
  };

  const handleUpdateTest = (id: number) => {
    navigate(`/dashboard/tests/${id}/update`);
  };

  const handleDeleteTest = () => {
    if (deleteTestId !== null) {
      deleteMutation.mutate(deleteTestId, {
        onSuccess: () => setDeleteTestId(null),
      });
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading tests.</Typography>;

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Tests</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/tests/create")}
        >
          Create Test
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Closed At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.data.map((test: TestType) => (
              <TableRow key={test.id}>
                <TableCell>{test.id}</TableCell>
                <TableCell>{test.title}</TableCell>
                <TableCell>{test.category?.name}</TableCell>
                <TableCell>{test.author?.username}</TableCell>
                <TableCell>{test.is_available ? "Yes" : "No"}</TableCell>
                <TableCell>{formatDate(test.created_at)}</TableCell>
                <TableCell>{formatDate(test.closed_at)}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewTest(test.id)}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateTest(test.id)}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  {(user?.type === "admin" || user?.id == test.author_id) && (
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => setDeleteTestId(test.id)}
                    >
                      Delete
                    </Button>
                  )}
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
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />

      <Dialog
        open={deleteTestId !== null}
        onClose={() => setDeleteTestId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this test?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTestId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={handleDeleteTest}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminTestsPage;
