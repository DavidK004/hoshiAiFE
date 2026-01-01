import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";

import { useCategories } from "../../hooks/categories/useCategories";
import { useGetTestById } from "../../hooks/tests/useGetTestById";
import { useQuestions } from "../../hooks/questions/useQuestions";
import { useCreateTest } from "../../hooks/tests/useCreateTest";
import { useUpdateTest } from "../../hooks/tests/useUpdateTest";
import type { QuestionType } from "../../components/shared/types/QuestionTypes";
import Container from "../../components/shared/Container";

const TestForm = () => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [closedAt, setClosedAt] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [questionsPage, setQuestionsPage] = useState(1);

  const { data: test, isLoading: isLoadingTest } = useGetTestById(
    isUpdate ? Number(id) : undefined
  );

  const { data: categories } = useCategories();
  const { data: questions, isLoading: isLoadingQuestions } = useQuestions({
    page: questionsPage,
    id: categoryId || undefined,
  });

  const createMutation = useCreateTest();
  const updateMutation = useUpdateTest();

  useEffect(() => {
    if (test) {
      setTitle(test.title);
      setDescription(test.description ?? "");
      setClosedAt(test.closed_at);
      setCategoryId(test.category_id);
      setSelectedQuestions(test.questions?.map((q) => q.id) ?? []);
    }
  }, [test]);

  if (isUpdate && isLoadingTest) return <CircularProgress />;

  const toggleQuestion = (id: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      closed_at: closedAt || null,
      category_id: Number(categoryId),
      questions: selectedQuestions,
    };

    if (isUpdate && id) {
      updateMutation.mutate(
        { id: Number(id), payload },
        { onSuccess: () => navigate("/dashboard/tests") }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => navigate("/dashboard/tests"),
      });
    }
  };

  return (
    <Container>
      <Typography variant="h5" mb={3}>
        {isUpdate ? "Update Test" : "Create Test"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <TextField
          type="datetime-local"
          label="Closed At"
          value={closedAt}
          onChange={(e) => setClosedAt(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Category"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(Number(e.target.value));
            setQuestionsPage(1);
            setSelectedQuestions([]);
          }}
          fullWidth
          required
          sx={{ mb: 3 }}
        >
          {categories?.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        {categoryId && (
          <>
            <Typography variant="h6" mb={1}>
              Questions
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {isLoadingQuestions ? (
                <CircularProgress />
              ) : (
                questions?.data.map((q: QuestionType) => (
                  <FormControlLabel
                    key={q.id}
                    control={
                      <Checkbox
                        checked={selectedQuestions.includes(q.id)}
                        onChange={() => toggleQuestion(q.id)}
                      />
                    }
                    label={q.title}
                  />
                ))
              )}
            </Box>
          </>
        )}
        {!categoryId && (
          <Typography variant="h6" mb={1}>
            Please select category to be able to select questions
          </Typography>
        )}

        <Pagination
          color="primary"
          shape="rounded"
          page={questionsPage}
          count={questions?.meta.last_page}
          onChange={(_, page) => setQuestionsPage(page)}
          sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "start" }}
        />

        <Button variant="contained" type="submit">
          {isUpdate ? "Update Test" : "Create Test"}
        </Button>
      </form>
    </Container>
  );
};

export default TestForm;
