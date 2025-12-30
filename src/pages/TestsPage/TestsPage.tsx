import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useGetTests } from "../../hooks/Tests/useGetTests";
import Container from "../../components/shared/Container";
import TestListCard from "../../components/TestListCard/TestListCard";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useCategories } from "../../hooks/categories/useCategories";

const TestsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all"
  );

  const { data: categories } = useCategories();
  const { data, isLoading, isError } = useGetTests({
    categoryId: selectedCategory === "all" ? undefined : selectedCategory,
    page: currentPage,
  });

  const handleCategoryChange = (event: SelectChangeEvent<number | "all">) => {
    const value = event.target.value;
    setSelectedCategory(value === "all" ? "all" : Number(value));
    setCurrentPage(1);
  };
  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Failed to load tests</Alert>;

  return (
    <Container>
      <Typography variant="h2">Curated tests</Typography>
      <Box p={2}>
        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="all">All</MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isLoading ? (
          <div>Loading tests...</div>
        ) : isError ? (
          <div>Failed to load tests</div>
        ) : (
          data?.data.map((test) => <TestListCard key={test.id} test={test} />)
        )}

        {data?.meta?.last_page && data.meta.last_page > 1 && (
          <Pagination
            color="primary"
            shape="rounded"
            count={data.meta.last_page}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center" }}
          />
        )}
      </Box>
    </Container>
  );
};

export default TestsPage;
