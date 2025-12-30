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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Container from "../../components/shared/Container";
import { useCategories } from "../../hooks/categories/useCategories";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory";

const CategoriesPage = () => {
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

  const { data, isLoading, isError } = useCategories();
  const deleteMutation = useDeleteCategory();
  const navigate = useNavigate();

  const handleCreateCategory = () => {
    navigate("/dashboard/categories/create");
  };

  const handleUpdateCategory = (id: number) => {
    navigate(`/dashboard/categories/${id}/update`);
  };

  const handleDeleteCategory = () => {
    if (deleteCategoryId !== null) {
      deleteMutation.mutate(deleteCategoryId, {
        onSuccess: () => setDeleteCategoryId(null),
      });
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading categories.</Typography>;

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Categories</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCategory}
        >
          Create Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Questions</TableCell>
              <TableCell>User Tests</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.questions_count ?? "-"}</TableCell>
                <TableCell>{category.user_tests_count ?? "-"}</TableCell>
                <TableCell>
                  {category.created_at
                    ? new Date(category.created_at).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleUpdateCategory(category.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => setDeleteCategoryId(category.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteCategoryId !== null}
        onClose={() => setDeleteCategoryId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this category?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteCategoryId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={handleDeleteCategory}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CategoriesPage;
