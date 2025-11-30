import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  TextField,
} from "@mui/material";
import type { UserTestAnswer } from "../shared/types/TestTypes";
import { useQueryClient } from "@tanstack/react-query";

interface TestQuestionProps {
  qa: UserTestAnswer;
  onSubmit: (answer: (string | number)[]) => void;
}

const TestQuestion = ({ qa, onSubmit }: TestQuestionProps) => {
  const queryClient = useQueryClient();
  const { question, answer: initialAnswer } = qa;
  const [selectedAnswers, setSelectedAnswers] = useState<(string | number)[]>(
    initialAnswer ?? []
  );

  useEffect(() => {
    setSelectedAnswers(initialAnswer ?? []);
    queryClient.invalidateQueries({ queryKey: ["current-test"] });
  }, [initialAnswer, qa.question.id]);

  const handleCheckboxChange = (variantId: number) => {
    if (question.type === "single") {
      setSelectedAnswers([variantId]);
    } else {
      setSelectedAnswers((prev) =>
        prev.includes(variantId)
          ? prev.filter((x) => x !== variantId)
          : [...prev, variantId]
      );
    }
  };

  const handleTextChange = (value: string) => {
    setSelectedAnswers([value]);
  };

  const handleSubmit = () => {
    onSubmit(selectedAnswers);
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        mb: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">{question.title}</Typography>
      {question.description && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {question.description}
        </Typography>
      )}

      {question.type === "text" && (
        <TextField
          fullWidth
          value={selectedAnswers[0] ?? ""}
          onChange={(e) => handleTextChange(e.target.value)}
          variant="outlined"
        />
      )}

      {(question.type === "single" || question.type === "multiple") &&
        question.variants.map((variant) => (
          <FormControlLabel
            key={variant.id}
            control={
              <Checkbox
                checked={selectedAnswers.includes(variant.id)}
                onChange={() => handleCheckboxChange(variant.id)}
              />
            }
            label={variant.text}
          />
        ))}

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Submit Answer
      </Button>
    </Box>
  );
};

export default TestQuestion;
