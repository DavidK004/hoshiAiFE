import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

import { useCategories } from "../../hooks/categories/useCategories";
import { useCreateQuestion } from "../../hooks/questions/useCreateQuestion";
import { useUpdateQuestion } from "../../hooks/questions/useUpdateQuestion";

import type { QuestionPayload } from "../../api/questionsApi";
import type { Variant } from "../../components/shared/types/QuestionTypes";
import Container from "../../components/shared/Container";
import { useQuestionById } from "../../hooks/questions/useQuestionById";
import GenerateQuestionModal from "../../components/GenerateQuestionModal/GenerateQuestionModal";

const QuestionForm = () => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"single" | "multiple" | "text">("single");
  const [difficulty, setDifficulty] = useState(1);
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [variants, setVariants] = useState<Variant[]>([{ id: 1, text: "" }]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);

  const [textAnswer, setTextAnswer] = useState("");
  const [openAiModal, setOpenAiModal] = useState(false);
  const [generatedQuestion, setGeneratedQuestion] =
    useState<QuestionPayload | null>(null);

  const { data: categories } = useCategories();
  const { data: question, isLoading: isLoadingQuestion } = useQuestionById(
    isUpdate ? Number(id) : undefined
  );

  const createMutation = useCreateQuestion();
  const updateMutation = useUpdateQuestion();

  useEffect(() => {
    if (question || generatedQuestion) {
      const q = question ?? generatedQuestion;
      setTitle(q.title);
      setDescription(q.description ?? "");
      setType(q.type);
      setDifficulty(q.difficulty);
      setCategoryId(q.category_id);
      if (q.type === "text") {
        setTextAnswer(q.correct_answers[0] as string);
      } else {
        setVariants(q.variants.length ? q.variants : [{ id: 1, text: "" }]);

        setCorrectAnswers(q.correct_answers);
      }
    }
  }, [question, generatedQuestion]);

  if (isUpdate && isLoadingQuestion) return <CircularProgress />;

  const handleVariantChange = (index: number, value: string) => {
    const newVariants = [...variants];
    newVariants[index].text = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((v) => v.id)) + 1,
        text: "",
      },
    ]);
  };

  const removeVariant = (index: number) => {
    const removedId = variants[index].id;

    setVariants((prev) => prev.filter((_, i) => i !== index));
    setCorrectAnswers((prev) => prev.filter((id) => id !== removedId));
  };

  const toggleCorrectAnswer = (variantId: number) => {
    if (type === "single") {
      setCorrectAnswers([variantId]);
    } else {
      setCorrectAnswers((prev) =>
        prev.includes(variantId)
          ? prev.filter((id) => id !== variantId)
          : [...prev, variantId]
      );
    }
  };

  const validate = () => {
    if (!title || !categoryId) return false;
    if (type !== "text") {
      if (variants.length < 2) return false;
      if (correctAnswers.length === 0) return false;
      if (type === "single" && correctAnswers.length !== 1) return false;
    } else {
      if (!textAnswer.trim()) return false;
    }
    if (difficulty < 1 || difficulty > 10) return false;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: QuestionPayload = {
      title,
      description,
      type,
      difficulty,
      category_id: Number(categoryId),
      variants: type === "text" ? [] : variants,
      correct_answers: correctAnswers,
    };

    if (isUpdate && id) {
      updateMutation.mutate(
        { id: Number(id), payload },
        { onSuccess: () => navigate("/dashboard/questions") }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => navigate("/dashboard/questions"),
      });
    }
  };

  return (
    <Container>
      <Typography variant="h5" mb={3}>
        {isUpdate ? "Update Question" : "Create Question"}
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
          rows={2}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) =>
            setType(e.target.value as "single" | "multiple" | "text")
          }
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="single">Single Choice</MenuItem>
          <MenuItem value="multiple">Multiple Choice</MenuItem>
          <MenuItem value="text">Text Answer</MenuItem>
        </TextField>

        <TextField
          label="Difficulty (1-10)"
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Category"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
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

        {type === "text" ? (
          <TextField
            label="Correct Answer"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
        ) : (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Variants & Correct Answer
            </Typography>
            {variants.map((v, i) => (
              <Paper
                key={v.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  p: 1,
                }}
              >
                <TextField
                  value={v.text}
                  onChange={(e) => handleVariantChange(i, e.target.value)}
                  fullWidth
                  required
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={correctAnswers.includes(v.id)}
                      onChange={() => toggleCorrectAnswer(v.id)}
                    />
                  }
                  label="Correct"
                  sx={{ ml: 1 }}
                />
                <IconButton onClick={() => removeVariant(i)}>
                  <Remove />
                </IconButton>
              </Paper>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={addVariant}>
              Add Variant
            </Button>
          </Box>
        )}

        <Button variant="contained" type="submit">
          {isUpdate ? "Update Question" : "Create Question"}
        </Button>
        {!isUpdate && (
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => setOpenAiModal(true)}
          >
            Generate with AI
          </Button>
        )}
      </form>
      <GenerateQuestionModal
        open={openAiModal}
        onClose={() => setOpenAiModal(false)}
        onGenerated={(q) => setGeneratedQuestion(q)}
      />
    </Container>
  );
};

export default QuestionForm;
