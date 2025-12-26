import {
  Typography,
  Pagination,
  type SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import Container from "../../components/shared/Container";
import { WelcomeContainer } from "./IndexPage.styles";
import StartTestForm from "../../components/StartTestForm/StartTestForm";
import Question from "../../components/Question/Question";
import { useQuestions } from "../../hooks/Question/useQuestions";
import type { QuestionType } from "../../components/shared/types/QuestionTypes";
import { useAuth } from "../../context/AuthContext";
import { useCategories } from "../../hooks/Question/useCategories";

const IndexPage = () => {
  const [page, setPage] = useState(1);

  const { data: categories } = useCategories();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all"
  );
  const questionsQuery = useQuestions({
    page,
    id: selectedCategory === "all" ? undefined : selectedCategory,
  });

  const questions = questionsQuery.data?.data ?? [];
  const loading = questionsQuery.isLoading;
  const error = questionsQuery.error?.message ?? null;
  const meta = questionsQuery.data?.meta ?? null;

  const handleCategoryChange = (event: SelectChangeEvent<number | "all">) => {
    const value = event.target.value;
    setSelectedCategory(value === "all" ? "all" : Number(value));
    setPage(1);
  };

  return (
    <Container>
      <WelcomeContainer>
        <Typography align="center" variant="h2">Welcome To HoshiAI!</Typography>
        <Typography variant="subtitle1">The best place to learn!</Typography>
      </WelcomeContainer>

      {user && (
        <>
          <Typography align="center" sx={{ mb: "36px" }} variant="h3">
            Start a Test
          </Typography>

          <StartTestForm />
        </>
      )}

      <Typography align="center" sx={{ mb: "36px" }} variant="h3">
        Browse Questions
      </Typography>

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

      {loading && <Typography>Loading questions...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {questions.map((q: QuestionType) => (
        <Question key={q.id} question={q} />
      ))}

      {meta && meta.last_page > 1 && (
        <Pagination
          count={meta.last_page}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center" }}
        />
      )}
    </Container>
  );
};

export default IndexPage;
