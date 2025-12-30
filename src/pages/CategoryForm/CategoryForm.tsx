import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import { useCreateCategory } from "../../hooks/categories/useCreateCategory";
import { useUpdateCategory } from "../../hooks/categories/useUpdateCategory";
import { useCategoryById } from "../../hooks/categories/useGetCategoryById";

const CategoryForm = () => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const { data: category, isLoading } = useCategoryById(
    id ? Number(id) : undefined
  );

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  if (isUpdate && isLoading) return <CircularProgress />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isUpdate && id) {
      updateCategoryMutation.mutate(
        { id: Number(id), name },
        { onSuccess: () => navigate("/dashboard/categories") }
      );
    } else {
      createCategoryMutation.mutate(name, {
        onSuccess: () => navigate("/dashboard/categories"),
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={3}>
        {isUpdate ? "Update Category" : "Create Category"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          sx={{ mb: 3 }}
        />

        <Button variant="contained" color="primary" type="submit">
          {isUpdate ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CategoryForm;

